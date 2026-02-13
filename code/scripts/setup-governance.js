const hre = require("hardhat");
const { formatUnits } = require("viem");

async function main() {
  // --- Setup Clients ---
  const publicClient = await hre.viem.getPublicClient();
  const [deployerWallet] = await hre.viem.getWalletClients();

  // --- Contract Configuration ---
  const multiSigAddress = "0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8";
  const yannCoinAddress = "0x35A2Aec877C4D547d7d5bc884292de95939DB185";
  
  const tokenAbi = (await hre.artifacts.readArtifact("YannCoin42")).abi;

  console.log("\n️  --- GOVERNANCE SETUP: INITIAL HANDOVER ---");

  // --- Step 1: Ownership Transfer ---
  // We verify if the MultiSig already holds the 'onlyOwner' rights
  const currentOwner = await publicClient.readContract({
    address: yannCoinAddress, 
    abi: tokenAbi, 
    functionName: "owner",
  });

  console.log(`\n[Step 1] Checking administrative rights...`);
  if (currentOwner.toLowerCase() !== multiSigAddress.toLowerCase()) {
    console.log("⚠️  Deployer is current owner. Transferring rights to MultiSig Vault...");
    
    const hashTransfer = await deployerWallet.writeContract({
      address: yannCoinAddress, 
      abi: tokenAbi, 
      functionName: "transferOwnership", 
      args: [multiSigAddress],
    });

    console.log("⏳ Waiting for ownership transfer receipt...");
    await publicClient.waitForTransactionReceipt({ hash: hashTransfer });
    console.log("✅ Ownership officially secured by MultiSig Vault.");
  } else {
    console.log("✅ Governance: MultiSig is already the contract administrator.");
  }

  // --- Step 2: Treasury Funding ---
  // We check if the MultiSig vault needs to be funded with the initial supply
  const msBalance = await publicClient.readContract({
    address: yannCoinAddress, 
    abi: tokenAbi, 
    functionName: "balanceOf", 
    args: [multiSigAddress],
  });

  console.log(`\n[Step 2] Checking Treasury status...`);
  if (msBalance === 0n) {
    const totalSupply = await publicClient.readContract({
      address: yannCoinAddress, 
      abi: tokenAbi, 
      functionName: "totalSupply",
    });

    console.log(`⚠️  Treasury empty. Funding with ${formatUnits(totalSupply, 18)} YC42...`);
    
    const hashFund = await deployerWallet.writeContract({
      address: yannCoinAddress, 
      abi: tokenAbi, 
      functionName: "transfer", 
      args: [multiSigAddress, totalSupply]
    });

    console.log("⏳ Waiting for funding transaction receipt...");
    await publicClient.waitForTransactionReceipt({ hash: hashFund });
    console.log("✅ MultiSig Treasury funded successfully.");
  } else {
    console.log(`✅ Treasury: MultiSig already holds ${formatUnits(msBalance, 18)} YC42.`);
  }

  console.log("\n✨ --- SETUP COMPLETE: SYSTEM IS NOW DECENTRALIZED ---");
}

main().catch((error) => {
  console.error("Critical Setup Error:", error);
  process.exit(1);
});