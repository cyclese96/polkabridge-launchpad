pragma solidity >=0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract BeyondFinance is ERC20, ERC20Detailed, ERC20Burnable {
    constructor(uint256 initialSupply)
        public
        ERC20Detailed("BeyondFinance", "BYN", 18)
    {
        _mint(msg.sender, initialSupply);
    }
}
