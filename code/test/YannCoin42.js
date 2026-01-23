const { expect } = require("chai");
const hre = require("hardhat");
const { parseEther } = require("viem");

describe("Post-deployement verifications", function () {
  it("The deployed contract must have the correct values", async function () {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    
    const artifact = await hre.artifacts.readArtifact("YannCoin42");
    const abi = artifact.abi;

    const publicClient = await hre.viem.getPublicClient();

    const name = await publicClient.readContract({
      address,
      abi,
      functionName: 'name',
    });

    console.log("Nom détecté :", name);
    expect(name).to.equal("YannCoin42");
  });

    it("We can use the deployed contract to transfert money", async function () {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    
    const artifact = await hre.artifacts.readArtifact("YannCoin42");
    const abi = artifact.abi;

    const publicClient = await hre.viem.getPublicClient();
    const [owner, addr1] = await hre.viem.getWalletClients();

    const transferAmount = parseEther("100");

    console.log("Transferring", transferAmount, "YannCoin42 to addr1:", addr1.account.address);

    const hash = await owner.writeContract({
      address,
      abi,
      functionName: 'transfer',
      args: [addr1.account.address, transferAmount],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    const balance = await publicClient.readContract({
  address,
  abi,
  functionName: 'balanceOf',
  args: [addr1.account.address]
});
    console.log("addr1 balance after transfer:", balance, "YannCoin42");
    expect(balance).to.equal(transferAmount);

  });
});