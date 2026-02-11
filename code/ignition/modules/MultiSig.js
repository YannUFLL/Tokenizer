const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MultiSig", (m) => {
    const owner1 = m.getAccount(0);
    const owner2 = m.getAccount(1);
    const owner3 = m.getAccount(2);

    const multisig = m.contract("MultiSig", [[owner1, owner2, owner3], 2]);

    return { multisig };
});