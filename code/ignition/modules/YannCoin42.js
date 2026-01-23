const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_SUPPLY = 1000000n; 

module.exports = buildModule("YannCoin42", (m) => {
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);

  const token = m.contract("YannCoin42", [initialSupply]);

  return { token };
});