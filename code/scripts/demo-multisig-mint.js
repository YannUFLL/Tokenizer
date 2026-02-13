const hre = require("hardhat");
const { parseUnits, formatUnits, encodeFunctionData } = require("viem");

async function main() {
  // --- Setup Clients ---
  const publicClient = await hre.viem.getPublicClient();
  const [owner1, owner2] = await hre.viem.getWalletClients();

  // --- Contract Configuration ---
  const multiSigAddress = "0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8";
  const yannCoinAddress = "0x35A2Aec877C4D547d7d5bc884292de95939DB185";
  
  const tokenAbi = (await hre.artifacts.readArtifact("YannCoin42")).abi;
  const multiSigAbi = (await hre.artifacts.readArtifact("MultiSig")).abi;

  console.log("\n🏦 --- GOVERNANCE ACTION: MONETARY POLICY (MINT) ---");

  // 1. Prepare Minting Data
  const mintAmount = parseUnits("500", 18);
  const data = encodeFunctionData({
    abi: tokenAbi, 
    functionName: "mint", 
    args: [multiSigAddress, mintAmount], // New supply sent to the Treasury
  });

  // Get current transaction count to identify our proposal index
  const txIndex = await publicClient.readContract({
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "getTransactionCount",
  });

  // 2. Submit Proposal (Owner 1)
  console.log(`\n[Step 1] Owner 1 proposing to MINT ${formatUnits(mintAmount, 18)} YC42...`);
  const hashSubmit = await owner1.writeContract({
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "submitTransaction", 
    args: [yannCoinAddress, 0n, data],
  });
  
  console.log("⏳ Waiting for proposal to be mined...");
  await publicClient.waitForTransactionReceipt({ hash: hashSubmit });
  console.log(`✅ Proposal indexed at ID: ${txIndex}`);

  // 3. Collect Signatures (Quorum 2/3)
  console.log("\n[Step 2] Collecting signatures for monetary expansion...");

  // Confirmation Owner 1
  const hashConfirm1 = await owner1.writeContract({ 
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "confirmTransaction", 
    args: [txIndex] 
  });
  console.log("⏳ Waiting for Owner 1 confirmation...");
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm1 });
  console.log("✅ Confirmation 1/2 received.");

  // Confirmation Owner 2
  const hashConfirm2 = await owner2.writeContract({ 
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "confirmTransaction", 
    args: [txIndex] 
  });
  console.log("⏳ Waiting for Owner 2 confirmation...");
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm2 });
  console.log("✅ Confirmation 2/2 received.");

  // 4. Authorized Execution
  console.log("\n[Step 3] Authorizing new supply on-chain...");
  const hashExec = await owner1.writeContract({ 
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "executeTransaction", 
    args: [txIndex] 
  });
  
  console.log("⏳ Waiting for execution receipt...");
  await publicClient.waitForTransactionReceipt({ hash: hashExec });

  // 5. Supply Verification
  const totalSupply = await publicClient.readContract({
    address: yannCoinAddress, 
    abi: tokenAbi, 
    functionName: "totalSupply",
  });

  console.log(`\n🏆 --- MONETARY POLICY UPDATE SUCCESS ---`);
  console.log(`The governance quorum has successfully minted new assets.`);
  console.log(`New Total Supply: ${formatUnits(totalSupply, 18)} YC42`);
}

main().catch((error) => {
  console.error("Critical Governance Error:", error);
  process.exit(1);
});