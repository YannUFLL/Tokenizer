const hre = require("hardhat");
const { parseEther, parseUnits, formatUnits, encodeFunctionData } = require("viem");

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  
  const [deployerWallet, owner2Wallet, receiverWallet] = await hre.viem.getWalletClients();

  const multiSigAddress  = "0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8";  // MultiSig address after deployment
  const yannCoinAddress = "0x35A2Aec877C4D547d7d5bc884292de95939DB185"; // YannCoin42 address after deployment`

  const tokenAbi = (await hre.artifacts.readArtifact("YannCoin42")).abi;
  const multiSigAbi = (await hre.artifacts.readArtifact("MultiSig")).abi

  // --- Step 0: Governance Check ---
  // Verify if the MultiSig contract holds administrative power (Ownership)
  console.log("\n--- Step 0: Governance Check ---");
  const currentOwner = await publicClient.readContract({
    address: yannCoinAddress,
    abi: tokenAbi,
    functionName: "owner",
  });

  if (currentOwner.toLowerCase() !== multiSigAddress.toLowerCase()) {
    console.log(`Current owner is NOT MultiSig. Transferring ownership...`);
    const hashTransfer = await deployerWallet.writeContract({
      address: yannCoinAddress,
      abi: tokenAbi,
      functionName: "transferOwnership",
      args: [multiSigAddress],
    });
    await publicClient.waitForTransactionReceipt({ hash: hashTransfer });
    console.log("✅ Ownership officially transferred to MultiSig!");
  } else {
    console.log("✅ Governance: MultiSig is already the owner.");
  }

  // --- Step 1: Funding Check ---
  // Verify if the MultiSig contract holds the token reserves (Treasury)
  console.log("\n--- Step 1: Funding Check ---");
  const msBalance = await publicClient.readContract({
    address: yannCoinAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [multiSigAddress],
  });

  // If the MultiSig balance is empty, transfer the total supply to its treasury
  if (msBalance === 0n) {
    const totalSupply = await publicClient.readContract({
      address: yannCoinAddress,
      abi: tokenAbi,
      functionName: "totalSupply",
    });

    console.log(`MultiSig is empty. Funding with total supply: ${formatUnits(totalSupply, 18)} YC42...`);
    
    const hashFund = await deployerWallet.writeContract({
      address: yannCoinAddress,
      abi: tokenAbi,
      functionName: "transfer",
      args: [multiSigAddress, totalSupply]
    });
    await publicClient.waitForTransactionReceipt({ hash: hashFund });
    console.log("✅ MultiSig Treasury funded successfully.");
  } else {
    console.log(`✅ Treasury: MultiSig already holds ${formatUnits(msBalance, 18)} YC42.`);
  }
  console.log("\n--- Step 2: Owner 1 (Deployer) submits a transaction ---");

  const transferData = encodeFunctionData({
    abi: tokenAbi,
    functionName: "transfer",
    args: [receiverWallet.account.address, parseUnits("100", 18)],
  });

  const txIndex = await publicClient.readContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: "getTransactionCount",
  });


  const hashSubmit = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: "submitTransaction",
    args: [yannCoinAddress, 0n, transferData],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashSubmit });
  console.log("✅ Transaction submitted by Owner 1 (Deployer) with index:", txIndex);

  console.log("\n--- Step 3: Owner 1 and Owner 2 confirm the transaction ---");

  const hashConfirm1 = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: "confirmTransaction",
    args: [txIndex],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm1 });
  console.log("✅ Transaction confirmed by Owner 1");
  const hashConfirm2 = await owner2Wallet.writeContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: "confirmTransaction",
    args: [txIndex],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashConfirm2 });
  console.log("✅ Transaction confirmed by Owner 2");

  console.log("\n--- Step 4: Execution ---");
  const hashExec = await deployerWallet.writeContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: "executeTransaction",
    args: [txIndex],
  });
  await publicClient.waitForTransactionReceipt({ hash: hashExec });

  const balance = await publicClient.readContract({
    address: yannCoinAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [receiverWallet.account.address],
  });

  console.log(`✅ Success! Receiver balance: ${formatUnits(balance, 18)} YC42`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});