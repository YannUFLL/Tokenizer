const { expect } = require("chai");
const hre = require("hardhat");
const { parseEther } = require("viem");

describe("YannCoin42 Unit Tests", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await hre.viem.getWalletClients();
    
    const token = await hre.viem.deployContract("YannCoin42", [
  1000000n]);
    
    const publicClient = await hre.viem.getPublicClient();

    return { token, owner, addr1, addr2, publicClient };
  }

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      const { token } = await deployTokenFixture();
      
      expect(await token.read.name()).to.equal("YannCoin42");
      expect(await token.read.symbol()).to.equal("YC42");
    });

    it("Should mint the total supply to the owner", async function () {
      const { token, owner } = await deployTokenFixture();
      const totalSupply = await token.read.totalSupply();
      const ownerBalance = await token.read.balanceOf([owner.account.address]);
      
      expect(totalSupply).to.equal(ownerBalance);
      expect(totalSupply).to.equal(parseEther("1000000"));
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { token, owner, addr1 } = await deployTokenFixture();
      const amount = parseEther("42");

      await token.write.transfer([addr1.account.address, amount]);

      const addr1Balance = await token.read.balanceOf([addr1.account.address]);
      expect(addr1Balance).to.equal(amount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { token, addr1, addr2 } = await deployTokenFixture();
      const initialBalance = await token.read.balanceOf([addr1.account.address]); // 0

      await expect(
        token.write.transfer([addr2.account.address, parseEther("1")], {
          account: addr1.account,
        })
      ).to.be.rejected; 
    });
  });
});