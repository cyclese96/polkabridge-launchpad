pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./ReentrancyGuard.sol";
import "./PolkaBridgeStaking.sol";

contract PolkaBridgeLaunchPad is Ownable, ReentrancyGuard {
    string public name = "PolkaBridge: LaunchPad v3";
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 polkaBridgeToken;
    PolkaBridgeStaking polkaBridgeStaking;

    address payable private ReceiveToken;

    struct IDOPool {
        uint256 Id;
        uint256 Begin;
        uint256 End;
        uint256 Type; //1:public, 2:private
        IERC20 IDOToken;
        uint256 MaxPurchaseTier1;
        uint256 MaxPurchaseTier2; //==public tier
        uint256 MaxPurchaseTier3;
        uint256 TotalCap;
        uint256 MinimumTokenSoldout;
        uint256 TotalToken; //total sale token for this pool
        uint256 RatePerETH;
        bool IsActived;
        uint256 LockDuration; //lock after purchase
        uint256 TotalSold; //total number of token sold
    }

    struct User {
        uint256 Id;
        address UserAddress;
        bool IsWhitelist;
        uint256 TotalTokenPurchase;
        uint256 TotalETHPurchase;
        uint256 PurchaseTime;
        bool IsActived;
        bool IsClaimed;
    }

    mapping(uint256 => mapping(address => User)) public whitelist; //poolid - listuser

    IDOPool[] pools;

    constructor(
        address payable receiveTokenAdd,
        IERC20 polkaBridge,
        PolkaBridgeStaking _polkaBridgeStaking
    ) public {
        ReceiveToken = receiveTokenAdd;
        polkaBridgeToken = polkaBridge;
        polkaBridgeStaking = _polkaBridgeStaking;
    }

    function addWhitelist(address user, uint256 pid) public onlyOwner {
        whitelist[pid][user].Id = pid;
        whitelist[pid][user].UserAddress = user;
        whitelist[pid][user].IsWhitelist = true;

        whitelist[pid][user].IsActived = true;
    }

    function addMulWhitelist(address[] memory user, uint256 pid)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < user.length; i++) {
            whitelist[pid][user[i]].Id = pid;
            whitelist[pid][user[i]].UserAddress = user[i];
            whitelist[pid][user[i]].IsWhitelist = true;

            whitelist[pid][user[i]].IsActived = true;
        }
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
        uint256 poolIndex = pid.sub(1);
        if (pools[poolIndex].Type == 1) //public
        {
            return (whitelist[pid][user].IsWhitelist &&
                whitelist[pid][user].IsActived);
        } else if (pools[poolIndex].Type == 2) //private
        {
            (
                uint256 amount,
                uint256 rewardDebt,
                uint256 rewardClaimed,
                uint256 lastBlock,
                uint256 beginTime,
                uint256 endTime
            ) = getUserStakingData(user, 0);
            return (amount >= 500 * 1e18);
        } else {
            return false;
        }
    }

    function getUserStakingData(address user, uint256 poolId)
        public
        view
        returns (
            uint256 amount,
            uint256 rewardDebt,
            uint256 rewardClaimed,
            uint256 lastBlock,
            uint256 beginTime,
            uint256 endTime
        )
    {
        return (polkaBridgeStaking.userInfo(poolId, user));
    }

    function addPool(
        uint256 begin,
        uint256 end,
        uint256 _type,
        IERC20 idoToken,
        uint256 maxPurchaseTier1,
        uint256 maxPurchaseTier2,
        uint256 maxPurchaseTier3,
        uint256 totalCap,
        uint256 totalToken,
        uint256 ratePerETH,
        uint256 lockDuration,
        uint256 minimumTokenSoldout
    ) public onlyOwner {
        uint256 id = pools.length.add(1);
        pools.push(
            IDOPool({
                Id: id,
                Begin: begin,
                End: end,
                Type: _type,
                IDOToken: idoToken,
                MaxPurchaseTier1: maxPurchaseTier1,
                MaxPurchaseTier2: maxPurchaseTier2,
                MaxPurchaseTier3: maxPurchaseTier3,
                TotalCap: totalCap,
                TotalToken: totalToken,
                RatePerETH: ratePerETH,
                IsActived: true,
                LockDuration: lockDuration,
                TotalSold: 0,
                MinimumTokenSoldout: minimumTokenSoldout
            })
        );
    }

    function updatePool(
        uint256 pid,
        uint256 begin,
        uint256 end,
        uint256 maxPurchaseTier1,
        uint256 maxPurchaseTier2,
        uint256 maxPurchaseTier3,
        uint256 totalCap,
        uint256 totalToken,
        uint256 ratePerETH,
        uint256 lockDuration,
        IERC20 idoToken,
        uint256 minimumTokenSoldout
    ) public onlyOwner {
        uint256 poolIndex = pid.sub(1);
        if (begin > 0) {
            pools[poolIndex].Begin = begin;
        }
        if (end > 0) {
            pools[poolIndex].End = end;
        }

        if (maxPurchaseTier1 > 0) {
            pools[poolIndex].MaxPurchaseTier1 = maxPurchaseTier1;
        }
        if (maxPurchaseTier2 > 0) {
            pools[poolIndex].MaxPurchaseTier2 = maxPurchaseTier2;
        }
        if (maxPurchaseTier3 > 0) {
            pools[poolIndex].MaxPurchaseTier3 = maxPurchaseTier3;
        }
        if (totalCap > 0) {
            pools[poolIndex].TotalCap = totalCap;
        }
        if (totalToken > 0) {
            pools[poolIndex].TotalToken = totalToken;
        }
        if (ratePerETH > 0) {
            pools[poolIndex].RatePerETH = ratePerETH;
        }
        if (lockDuration > 0) {
            pools[poolIndex].LockDuration = lockDuration;
        }
        if (minimumTokenSoldout > 0) {
            pools[poolIndex].MinimumTokenSoldout = minimumTokenSoldout;
        }
        pools[poolIndex].IDOToken = idoToken;
    }

    function stopPool(uint256 pid) public onlyOwner {
        uint256 poolIndex = pid.sub(1);
        pools[poolIndex].IsActived = false;
    }

    function activePool(uint256 pid) public onlyOwner {
        uint256 poolIndex = pid.sub(1);
        pools[poolIndex].IsActived = true;
    }

    //withdraw contract token
    //use for someone send token to contract
    //recuse wrong user

    function withdrawErc20(IERC20 token) public onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    //withdraw ETH after IDO
    function withdrawPoolFund() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "not enough fund");
        ReceiveToken.transfer(balance);
    }

    function purchaseIDO(uint256 pid) public payable nonReentrant {
        uint256 poolIndex = pid.sub(1);

        require(pools[poolIndex].IsActived, "invalid pool");
        require(
            block.timestamp >= pools[poolIndex].Begin &&
                block.timestamp <= pools[poolIndex].End,
            "invalid time"
        );
        //check user
        require(IsWhitelist(msg.sender, pid), "invalid user");

        //check amount
        uint256 ethAmount = msg.value;
        whitelist[pid][msg.sender].TotalETHPurchase = whitelist[pid][msg.sender]
            .TotalETHPurchase
            .add(ethAmount);

        if (pools[poolIndex].Type == 2) {
            (
                uint256 stakeAmount,
                uint256 rewardDebt,
                uint256 rewardClaimed,
                uint256 lastBlock,
                uint256 beginTime,
                uint256 endTime
            ) = getUserStakingData(msg.sender, 0);
            if (stakeAmount < 3000 * 1e18) {
                require(
                    whitelist[pid][msg.sender].TotalETHPurchase <=
                        pools[poolIndex].MaxPurchaseTier1,
                    "invalid maximum purchase for tier1"
                );
            } else if (
                stakeAmount >= 3000 * 1e18 && stakeAmount < 5000 * 1e18
            ) {
                require(
                    whitelist[pid][msg.sender].TotalETHPurchase <=
                        pools[poolIndex].MaxPurchaseTier2,
                    "invalid maximum purchase for tier2"
                );
            } else {
                require(
                    whitelist[pid][msg.sender].TotalETHPurchase <=
                        pools[poolIndex].MaxPurchaseTier3,
                    "invalid maximum purchase for tier3"
                );
            }
        } else {
            //public pool follow tier2
            require(
                whitelist[pid][msg.sender].TotalETHPurchase <=
                    pools[poolIndex].MaxPurchaseTier2,
                "invalid maximum contribute"
            );
        }

        uint256 tokenAmount =
            ethAmount.mul(pools[poolIndex].RatePerETH).div(1e18);

        uint256 remainToken = getRemainIDOToken(pid);
        require(
            remainToken > pools[poolIndex].MinimumTokenSoldout,
            "IDO sold out"
        );
        require(remainToken >= tokenAmount, "IDO sold out");

        whitelist[pid][msg.sender].TotalTokenPurchase = whitelist[pid][
            msg.sender
        ]
            .TotalTokenPurchase
            .add(tokenAmount);

        pools[poolIndex].TotalSold = pools[poolIndex].TotalSold.add(
            tokenAmount
        );
    }

    function claimToken(uint256 pid) public nonReentrant {
        require(!whitelist[pid][msg.sender].IsClaimed, "user already claimed");
        uint256 poolIndex = pid.sub(1);

        require(
            block.timestamp >=
                pools[poolIndex].End.add(pools[poolIndex].LockDuration),
            "not on time for claiming token"
        );

        uint256 userBalance = getUserTotalPurchase(pid);

        require(userBalance > 0, "invalid claim");

        pools[poolIndex].IDOToken.transfer(msg.sender, userBalance);
        whitelist[pid][msg.sender].IsClaimed = true;
    }

    function getUserTotalPurchase(uint256 pid) public view returns (uint256) {
        return whitelist[pid][msg.sender].TotalTokenPurchase;
    }

    function getRemainIDOToken(uint256 pid) public view returns (uint256) {
        uint256 poolIndex = pid.sub(1);
        uint256 tokenBalance = getBalanceTokenByPoolId(pid);
        if (pools[poolIndex].TotalSold > tokenBalance) {
            return 0;
        }

        return tokenBalance.sub(pools[poolIndex].TotalSold);
    }

    function getBalanceTokenByPoolId(uint256 pid)
        public
        view
        returns (uint256)
    {
        uint256 poolIndex = pid.sub(1);
        //return pools[poolIndex].IDOToken.balanceOf(address(this));
        return pools[poolIndex].TotalToken;
    }

    function getPoolInfo(uint256 pid)
        public
        view
        returns (
            uint256,
            uint256,
            // uint256,
            // uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            IERC20
        )
    {
        uint256 poolIndex = pid.sub(1);
        return (
            pools[poolIndex].Begin,
            pools[poolIndex].End,
            pools[poolIndex].Type,
            //pools[poolIndex].AmountPBRRequire,
            //pools[poolIndex].MaxPurchase,
            pools[poolIndex].RatePerETH,
            pools[poolIndex].LockDuration,
            pools[poolIndex].TotalSold,
            pools[poolIndex].IsActived,
            pools[poolIndex].IDOToken
        );
    }

    function getPoolSoldInfo(uint256 pid)
        public
        view
        returns (uint256, uint256)
    {
        uint256 poolIndex = pid.sub(1);
        return (pools[poolIndex].LockDuration, pools[poolIndex].TotalSold);
    }

    function getWhitelistfo(uint256 pid)
        public
        view
        returns (
            address,
            bool,
            uint256,
            uint256,
            bool
        )
    {
        return (
            whitelist[pid][msg.sender].UserAddress,
            whitelist[pid][msg.sender].IsWhitelist,
            whitelist[pid][msg.sender].TotalTokenPurchase,
            whitelist[pid][msg.sender].TotalETHPurchase,
            whitelist[pid][msg.sender].IsClaimed
        );
    }

    function getUserInfo(uint256 pid, address user)
        public
        view
        returns (
            bool,
            uint256,
            uint256,
            bool
        )
    {
        return (
            whitelist[pid][user].IsWhitelist,
            whitelist[pid][user].TotalTokenPurchase,
            whitelist[pid][user].TotalETHPurchase,
            whitelist[pid][user].IsClaimed
        );
    }
}
