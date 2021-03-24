pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract PolkaBridgeLaunchPad is Ownable {
    string public name = "PolkaBridge: LaunchPad";
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

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
    }

    struct User {
        uint256 Id;
        address UserAddress;
        bool IsWhitelist;
        uint256 WhitelistDate;
        uint256 TotalPurchase;
        uint256 PurchaseTime;
        bool IsActived;
    }

    mapping(uint256 => mapping(address => User)) whitelist; //poolid - listuser

    IDOPool[] pools;

    constructor()public {}

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

    function addPool(
        string memory name,
        uint256 begin,
        uint256 end,
        uint256 type,
        IERC20 idoToken,
        uint256 minPurchase,
        uint256 maxPurchase,
        uint256 totalCap,
        uint25 amountPBRRequire,
        uint256 ratePerETH
    ) public onlyOwner {
        uint256 id = pools.length+1;
        pools.push(IDOPool({
            Id:id,
            Name:name,
            Begin:begin,
            End:end,
            Type:type,
AmountPBRRequire:amountPBRRequire,
        IDOToken:idoToken,
        MinPurchase:minPurchase,
        MaxPurchase: maxPurchase,
        TotalCap: totalCap,
        RatePerETH:ratePerETH,
        IsActived:true,
IsStoped:false,
ActivedDate:block.timestamp,
StopDate:0


        }));
    }

    receive() external payable {}
}
