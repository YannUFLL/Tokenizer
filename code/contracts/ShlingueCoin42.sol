pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SchlingueCoin42 is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken42", "MT42") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
