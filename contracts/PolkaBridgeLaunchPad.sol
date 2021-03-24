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
        uint256 Type; //public, private
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

    mapping(uint25 => mapping(address => User)) whitelist; //poolid - listuser

    constructor() {}

    function addWhitelist(address user, uint256 id) public onlyOwner {
        whitelist[id][user].Id = id;
        whitelist[id][user].UserAddress = user;
        whitelist[id][user].IsWhitelist = true;
        whitelist[id][user].WhitelistDate = block.timestamp;
        whitelist[id][user].IsActived = true;
    }

    function updateWhitelist(
        address user,
        uint256 id,
        bool isWhitelist,
        bool isActived
    ) public onlyOwner {
        whitelist[id][user].IsWhitelist = isWhitelist;
        whitelist[id][user].IsActived = isActived;
    }

    function addPool(uint256 Id,
        string Name,
        uint256 Begin,
        uint256 End,
        uint256 Type,
        IERC20 IDOToken,
        uint256 MinPurchase,
        uint256 MaxPurchase,
        uint256 TotalCap,
        uint256 RatePerETH,
        bool IsActived,
        bool IsStoped,
        uint256 ActivedDate,
        uint256 StopDate) public onlyOwner{

    }

    external payable receive() {}
}
