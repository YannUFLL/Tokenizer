const hre = require("hardhat");
const { parseEther, parseUnits, formatUnits, encodeFunctionData } = require("viem");

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  
  const [deployerWallet, owner2Wallet, receiverWallet] = await hre.viem.getWalletClients();

  const multiSigAddress  = "0x...";  // MultiSig address after deployment
  const yannCoinAddress = "0x..."; // YannCoin42 address after deployment`

  console.log("\n--- Step 1: Funding the MultiSig ---");
  const amountToFund = parseUnits("1000", 18);
  
  const hashFund = await deployerWallet.writeContract({
    address: yannCoinAddress,
    abi: (await hre.artifacts.readArtifact("YannCoin42")).abi,
    functionName: "transfer",
    args: [multiSigAddress, amountToFund],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashFund });
  console.log("MultiSig funded with 1000 YC42");

  console.log("\n--- Step 2: Owner 1 (Deployer) submits a transaction ---");

  const transferData = encodeFunctionData({
    abi: (await hre.artifacts.readArtifact("YannCoin42")).abi,
    functionName: "transfer",
    args: [receiverWallet.account.address, parseUnits("100", 18)],
  });

  const hashSubmit = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: (await hre.artifacts.readArtifact("MultiSig")).abi,
    functionName: "submitTransaction",
    args: [yannCoinAddress, 0n, transferData],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashSubmit });
  console.log("Transaction submitted for 100 YC42");

  console.log("\n--- Step 3: Owner 1 and Owner 2 confirm the transaction ---");

  const hashConfirm1 = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: (await hre.artifacts.readArtifact("MultiSig")).abi,
    functionName: "confirmTransaction",
    args: [0n],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm1 });
  console.log("Transaction confirmed by Owner 1");
  const hashConfirm2 = await owner2Wallet.writeContract({
    address: multiSigAddress,
    abi: (await hre.artifacts.readArtifact("MultiSig")).abi,
    functionName: "confirmTransaction",
    args: [0n],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm2 });
  console.log("Transaction confirmed by Owner 2");

  console.log("\n--- Step 4: Execution ---");
  const hashExec = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: (await hre.artifacts.readArtifact("MultiSig")).abi,
    functionName: "executeTransaction",
    args: [0n],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashExec });

  const balance = await publicClient.readContract({
    address: yannCoinAddress,
    abi: (await hre.artifacts.readArtifact("YannCoin42")).abi,
    functionName: "balanceOf",
    args: [receiverWallet.account.address],
  });

  console.log(`Success! Receiver balance: ${formatUnits(balance, 18)} YC42`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});