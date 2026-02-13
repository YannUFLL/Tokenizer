const hre = require("hardhat");
const { parseUnits, formatUnits, encodeFunctionData } = require("viem");

async function main() {
  // --- Setup Clients ---
  const publicClient = await hre.viem.getPublicClient();
  const [owner1, owner2, receiver] = await hre.viem.getWalletClients();

  // --- Contract Configuration ---
  const multiSigAddress = "0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8";
  const yannCoinAddress = "0x35A2Aec877C4D547d7d5bc884292de95939DB185";
  
  const tokenAbi = (await hre.artifacts.readArtifact("YannCoin42")).abi;
  const multiSigAbi = (await hre.artifacts.readArtifact("MultiSig")).abi;

  console.log("\n💸 --- MULTISIG OPERATION: SECURE TRANSFER ---");

  // 1. Prepare Transaction Data
  const amount = parseUnits("100", 18);
  const data = encodeFunctionData({
    abi: tokenAbi, 
    functionName: "transfer", 
    args: [receiver.account.address, amount],
  });

  // Get the future index of our transaction
  const txIndex = await publicClient.readContract({
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "getTransactionCount",
  });

  // 2. Submit Transaction (Owner 1)
  console.log(`\n[Step 1] Owner 1 proposing to transfer ${formatUnits(amount, 18)} YC42...`);
  const hashSubmit = await owner1.writeContract({
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "submitTransaction", 
    args: [yannCoinAddress, 0n, data],
  });
  
  console.log("⏳ Waiting for proposal to be mined...");
  await publicClient.waitForTransactionReceipt({ hash: hashSubmit });
  console.log(`✅ Proposal submitted at Index: ${txIndex}`);

  // 3. Confirmations (Quorum 2/3)
  console.log("\n[Step 2] Collecting signatures (Owner 1 & Owner 2)...");

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

  // 4. Execution
  console.log("\n[Step 3] Triggering final execution...");
  const hashExec = await owner1.writeContract({ 
    address: multiSigAddress, 
    abi: multiSigAbi, 
    functionName: "executeTransaction", 
    args: [txIndex] 
  });
  
  console.log("⏳ Waiting for execution receipt...");
  await publicClient.waitForTransactionReceipt({ hash: hashExec });

  // 5. Balance Verification
  const balance = await publicClient.readContract({
    address: yannCoinAddress, 
    abi: tokenAbi, 
    functionName: "balanceOf", 
    args: [receiver.account.address],
  });

  console.log(`\n🏆 --- TRANSFER SUCCESS ---`);
  console.log(`The MultiSig Vault has moved the funds.`);
  console.log(`Receiver balance: ${formatUnits(balance, 18)} YC42`);
}

main().catch((error) => {
  console.error("Critical Error:", error);
  process.exit(1);
});