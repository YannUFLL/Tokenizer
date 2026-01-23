pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YannCoin42 is ERC20 {
    constructor(uint256 initialSupply) ERC20("YannCoin42", "YC42") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
