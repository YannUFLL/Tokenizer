const { parseEther, formatEther } = require("viem");
const hre = require("hardhat");

async function main() {
  // 1. Get wallet and public clients
  const [owner1, owner2, owner3] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  
  // Amount to send (0.05 ETH)
  const amount = parseEther("0.05");

  const recipients = [
    { name: "Owner 2", wallet: owner2 },
    { name: "Owner 3", wallet: owner3 }
  ];

  // Check sender's balance
  const owner1Balance = await publicClient.getBalance({ address: owner1.account.address });
  console.log(`\n--- Starting Distribution ---`);
  console.log(`Owner 1 Balance: ${formatEther(owner1Balance)} ETH`);

  for (const recipient of recipients) {
    const balance = await publicClient.getBalance({ address: recipient.wallet.account.address });
    
    // If the account has less than 0.01 ETH, we refill it
    if (balance < parseEther("0.01")) {
      console.log(`Sending 0.05 ETH to ${recipient.name} (${recipient.wallet.account.address})...`);
      
      const hash = await owner1.sendTransaction({
        to: recipient.wallet.account.address,
        value: amount,
      });

      // Wait for block confirmation (crucial on Sepolia!)
      await publicClient.waitForTransactionReceipt({ hash });
      console.log(`✅ ${recipient.name} has been funded!`);
    } else {
      console.log(`💡 ${recipient.name} already has ${formatEther(balance)} ETH. Skipping.`);
    }
  }

  console.log("--- All accounts are ready ---\n");
}

// Execute the script with proper error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during script execution:");
    console.error(error);
    process.exit(1);
  });