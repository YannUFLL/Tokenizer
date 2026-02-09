
# Deployment 
## 1. 📋 Prerequisites

Ensure you have the following installed and configured:

* **Node.js** (v18 or newer) & **npm**
* **MetaMask Wallet** with **Sepolia ETH** (Get some from a [Sepolia Faucet](https://sepoliafaucet.com/))
* **Infura API Key:** Required to connect to the Ethereum network without running a full node. [Get one here](https://infura.io/).
* **Etherscan API Key:** Required to verify your contract and get the "Verified" badge. [Get one here](https://etherscan.io/myapikey).

## 2. 🛠️ Installation & Setup

### **1\. Clone and Install**

\# Navigate to the code directory

```bash 
cd code 
```

\# install depedencies

```bash 
npm install 
```

### **2\. Security Configuration**

We use Hardhat's built-in configuration variables to keep private keys secure. **Do not use `.env` files for sensitive data.**

**Note:** If you don't have these keys yet, you can create free accounts on Infura and Etherscan to generate them. They are essential for interacting with public testnets.

\# the infura etherum node network provide access to the sepolia testnet in a simple and easy way

```bash 
npx hardhat vars set INFURA_API_KEY
```


\# Set your MetaMask Private Key (Account must have testnet tokens)
Metamask is a wallet manager. this allow to easly demonstrate the transfert of our token.

```bash 
npx hardhat vars set SEPOLIA_PRIVATE_KEY 
```

\# Set your EtherSCAN Private API key, this allow to have the verified badge near to the token and display plainly the source code.

```bash
npx hardhat vars set ETHERSCAN_API_KEY
```

**Note:** These variables are stored locally on your machine, outside of the repository, ensuring zero risk of leaking keys to GitHub.




### **3\. Contract compilation **

```bash
npx hardhat compile 
```


## 3. 🚀 Deployment on network

### **Local Network (Development)**

To test the deployment script on a local simulated blockchain:

```bash
npx hardhat node 
```

\# In a separate terminal

```bash
npx hardhat ignition deploy ignition/modules/YannCoin42.js --network localhost
```

### **Public Testnet (Sepolia)**

To deploy your token to the Ethereum Sepolia Testnet:

```bash
npx hardhat ignition deploy ignition/modules/YannCoin42.js --network sepolia --verify
```

## 4. 🧪 Interactions & Demonstration**

To ensure the integrity of the token, we use a suite of automated unit tests. These tests are executed on a local Hardhat network to guarantee instant feedback and a clean state for every test case.

### **1. Run Automated Unit Tests**

This command will deploy the contract to a local instance and verify core functionalities (Name, Symbol, Total Supply, and Transfer logic).

```bash
npx hardhat test

```

### **2. Specific Test Cases**

If you want to verify specific features of the contract as mentioned in the documentation:

**Check Contract metadata:**
Verifies that the token is correctly initialized with the name "YannCoin42" and symbol "YC42".

```bash
npx hardhat test --grep "Deployment"

```

**Check Transfer functionality:**
Simulates a transfer between two accounts and verifies balance updates.

```bash
npx hardhat test --grep "Transactions"

```

### **3. Live Network Verification**

While unit tests guarantee the code logic, the actual deployment can be verified manually:

* **Blockchain Explorer:** Search for the contract address on [Etherscan Sepolia](https://sepolia.etherscan.io/) to see the verified source code and the minting transaction.
* **Wallet Interaction:** Use **MetaMask** to import the token and perform a manual transfer to verify the integration with standard Web3 tooling
(see whitepaper).
## 5. 📍 Deployment Info (Sepolia)
* **Contract Address:** `0x005942821558a8a837cB25C5B34695a6855c6672`
* **Explorer:** [View on Etherscan](https://sepolia.etherscan.io/token/0x005942821558a8a837cB25C5B34695a6855c6672)
