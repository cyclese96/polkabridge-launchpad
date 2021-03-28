pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract PolkaBridgeLaunchPad is Ownable {
    string public name = "PolkaBridge: LaunchPad";
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    uint256 private CONST_MINIMUM = 1000000000000000000;

    struct IDOPool {
        uint256 Id;
        string Name;
        uint256 Begin;
        uint256 End;
        uint256 Type; //1:public, 2:private
        uint256 AmountPBRRequire;
        IERC20 IDOToken;
        uint256 MinPurchase;
        uint256 MaxPurchase;
        uint256 TotalCap;
        uint256 RatePerETH;
        bool IsActived;
        bool IsStoped;
        uint256 ActivedDate;
        uint256 StopDate;
        uint256 LockDuration; //lock after purchase
        uint256 TotalSold; //total number of token sold
        bool IsSoldOut; //reach hardcap
        uint256 SoldOutAt; //sold out at time
    }

    struct User {
        uint256 Id;
        address UserAddress;
        bool IsWhitelist;
        uint256 WhitelistDate;
        uint256 TotalTokenPurchase;
        uint256 TotalETHPurchase;
        uint256 PurchaseTime;
        bool IsActived;
        bool IsClaimed;
    }

    mapping(uint256 => mapping(address => User)) whitelist; //poolid - listuser

    IDOPool[] pools;

    constructor() public {}

    function addWhitelist(address user, uint256 pid) public onlyOwner {
        whitelist[pid][user].Id = pid;
        whitelist[pid][user].UserAddress = user;
        whitelist[pid][user].IsWhitelist = true;
        whitelist[pid][user].WhitelistDate = block.timestamp;
        whitelist[pid][user].IsActived = true;
    }

    function updateWhitelist(
        address user,
        uint256 pid,
        bool isWhitelist,
        bool isActived
    ) public onlyOwner {
        whitelist[pid][user].IsWhitelist = isWhitelist;
        whitelist[pid][user].IsActived = isActived;
    }

    function IsWhitelist(address user, uint256 pid) public view returns (bool) {
        return whitelist[pid][user].IsWhitelist;
    }

    function addPool(
        string memory name,
        uint256 begin,
        uint256 end,
        uint256 _type,
        IERC20 idoToken,
        uint256 minPurchase,
        uint256 maxPurchase,
        uint256 totalCap,
        uint256 amountPBRRequire,
        uint256 ratePerETH,
        uint256 lockDuration
    ) public onlyOwner {
        uint256 id = pools.length.add(1);
        pools.push(
            IDOPool({
                Id: id,
                Name: name,
                Begin: begin,
                End: end,
                Type: _type,
                AmountPBRRequire: amountPBRRequire,
                IDOToken: idoToken,
                MinPurchase: minPurchase,
                MaxPurchase: maxPurchase,
                TotalCap: totalCap,
                RatePerETH: ratePerETH,
                IsActived: true,
                IsStoped: false,
                ActivedDate: block.timestamp,
                StopDate: 0,
                LockDuration: lockDuration
            })
        );
    }

    function updatePool(
        uint256 pid,
        uint256 begin,
        uint256 end,
        uint256 amountPBRRequire,
        uint256 minPurchase,
        uint256 maxPurchase,
        uint256 totalCap,
        bool isActived,
        bool isStoped,
        uint256 lockDuration
    ) public onlyOwner {
        uint256 poolIndex = pid.sub(1);
        if (begin > 0) {
            pools[poolIndex].Begin = begin;
        }
        if (end > 0) {
            pools[poolIndex].End = end;
        }
        if (amountPBRRequire > 0) {
            pools[poolIndex].AmountPBRRequire = amountPBRRequire;
        }
        if (minPurchase > 0) {
            pools[poolIndex].MinPurchase = minPurchase;
        }
        if (maxPurchase > 0) {
            pools[poolIndex].MaxPurchase = maxPurchase;
        }
        if (maxPurchase > 0) {
            pools[poolIndex].TotalCap = totalCap;
        }
        pools[poolIndex].IsActived = isActived;
        pools[poolIndex].IsStoped = isStoped;
        if (isStoped) {
            pools[poolIndex].StopDate = block.timestamp;
        }

        if (lockDuration > 0) {
            pools[poolIndex].LockDuration = lockDuration;
        }
    }

    //withdraw contract token
    //use for someone send token to contract
    //recuse wrong user

    function withdrawErc20(IERC20 token) public onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    function withdrawPoolFund() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "not enough fund");
        owner().transfer(balance);
    }

    function purchaseIDO(uint256 pid) public payable {
        uint256 poolIndex = pid.sub(1);
        require(poolIndex >= 0, "invalid pool");
        require(
            pools[poolIndex].IsActived && !pools[poolIndex].IsStoped,
            "invalid pool"
        );
        require(
            block.timestamp >= pools[poolIndex].Begin &&
                block.timestamp <= pools[poolIndex].End,
            "invalid time"
        );
        uint256 remainToken = remainIDOToken(poolIndex);
        require(
            remainToken > CONST_MINIMUM && !pools[poolIndex].IsSoldOut,
            "IDO sold out"
        );

        uint256 ethAmount = msg.value;
        require(
            ethAmount >= pools[poolIndex].MinPurchase,
            "invalid minimum contribute"
        );
        require(
            ethAmount <= pools[poolIndex].MaxPurchase,
            "invalid maximum contribute"
        );
        whitelist[pid][msg.sender].TotalETHPurchase = whitelist[pid][msg.sender]
            .TotalETHPurchase
            .add(ethAmount);
        if (
            whitelist[pid][msg.sender].TotalETHPurchase >
            pools[poolIndex].MaxPurchase
        ) {
            whitelist[pid][msg.sender].TotalETHPurchase = whitelist[pid][
                msg.sender
            ]
                .TotalETHPurchase
                .sub(ethAmount);
            revert("invalid maximum contribute");
        }

        //storage
        uint256 tokenAmount = ethAmount.mul(pools[poolIndex].RatePerETH);
        whitelist[pid][msg.sender].TotalTokenPurchase = whitelist[pid][
            msg.sender
        ]
            .TotalTokenPurchase
            .add(tokenAmount);

        pools[poolIndex].TotalSold = pools[poolIndex].TotalSold.add(
            tokenAmount
        );
    }

    function claimToken(uint256 pid) public {
        require(!whitelist[pid][msg.sender].IsClaimed, "user already claimed");
        uint256 poolIndex = pid.sub(1);
        require(poolIndex >= 0, "invalid pool");

        require(
            block.timestamp >=
                pools[poolIndex].Begin.add(pools[poolIndex].LockDuration),
            "not on time"
        );

        uint256 userBalance = getUserTotalPurchase(pid);

        pools[poolIndex].IDOToken.transfer(msg.sender, userBalance);
        whitelist[pid][msg.sender].IsClaimed = true;
    }

    function getUserTotalPurchase(uint256 pid) public view returns (uint256) {
        return whitelist[pid][msg.sender].TotalTokenPurchase;
    }

    function remainIDOToken(uint256 poolIndex) public view returns (uint256) {
        return
            pools[poolIndex].IDOToken.balanceOf(address(this)).sub(
                pools[poolIndex].TotalSold
            );
    }

    receive() external payable {}
}
