const { expect } = require("chai");
const hre = require("hardhat");
const { parseEther, encodeFunctionData } = require("viem");

describe("MultiSig Security Tests", function () {
  async function deployMultiSigFixture() {
    const [owner1, owner2, owner3, receiver] = await hre.viem.getWalletClients();
    
    const multiSig = await hre.viem.deployContract("MultiSig", [
      [owner1.account.address, owner2.account.address, owner3.account.address],
      2n 
    ]);

    const token = await hre.viem.deployContract("YannCoin42", [1000000n]);
    
    await token.write.transfer([multiSig.address, parseEther("1000")]);

    return { multiSig, token, owner1, owner2, owner3, receiver };
  }

  it("Should NOT execute a transaction if quorum is not met", async function () {
    const { multiSig, token, owner1, receiver } = await deployMultiSigFixture();
    
    const transferData = encodeFunctionData({
      abi: token.abi,
      functionName: "transfer",
      args: [receiver.account.address, parseEther("100")],
    });

    await multiSig.write.submitTransaction([token.address, 0n, transferData]);
    
    await multiSig.write.confirmTransaction([0n]);

    await expect(
      multiSig.write.executeTransaction([0n])
    ).to.be.rejectedWith("Not enough confirmations"); 
  });

  it("Should execute a transaction when quorum is reached", async function () {
    const { multiSig, token, owner1, owner2, receiver } = await deployMultiSigFixture();
    
    const transferData = encodeFunctionData({
      abi: token.abi,
      functionName: "transfer",
      args: [receiver.account.address, parseEther("100")],
    });

    await multiSig.write.submitTransaction([token.address, 0n, transferData]);
    await multiSig.write.confirmTransaction([0n]); 
    await multiSig.write.confirmTransaction([0n], { account: owner2.account }); 

    await multiSig.write.executeTransaction([0n]);

    const balance = await token.read.balanceOf([receiver.account.address]);
    expect(balance).to.equal(parseEther("100"));
  });
});