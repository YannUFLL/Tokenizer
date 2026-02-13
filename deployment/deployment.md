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

\# install dependencies

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
Metamask is a wallet manager. this allow to easly demonstrate the transfer of our token.

```bash 
npx hardhat vars set OWNER_1_PRIVATE_KEY
```

**set other owners account (used in bonus)** 

```bash
npx hardhat vars set OWNER_2_PRIVATE_KEY
```

```bash
npx hardhat vars set OWNER_3_PRIVATE_KEY
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

**bonus**:

```bash
npx hardhat ignition deploy ignition/modules/MultiSig.js --network localhost
```

### **Public Testnet (Sepolia)**

To deploy your token to the Ethereum Sepolia Testnet:

```bash
npx hardhat ignition deploy ignition/modules/YannCoin42.js --network sepolia --verify
```

**bonus**:

```bash
npx hardhat ignition deploy ignition/modules/MultiSig.js --network sepolia --verify
```

## 4. 🧪 Interactions & Demonstration**

To ensure the integrity of the token, we use a suite of automated unit tests. These tests are executed on a local Hardhat network to guarantee instant feedback and a clean state for every test case.

### **1. Run Automated Unit Tests**

This command will deploy the contract to a local instance and verify core functionalities (Name, Symbol, Total Supply, and Transfer logic).

```bash
npx hardhat test test/YannCoin42.js
```

### **2. Specific Test Cases**

If you want to verify specific features of the contract as mentioned in the documentation:

These tests are executed on a temporary, in-memory Hardhat network created specifically for the test execution.

* **Isolated State:** This is NOT the persistent local node (started via ```npx hardhat node```); it is a fresh environment that is destroyed immediately after the tests finish.

* **No Cost:** It does not require Sepolia ETH or any external connection.

* **Safety:** It guarantees that your tests always start from a clean state without affecting any live deployments.


**Check Contract metadata:**
Verifies that the token is correctly initialized with the name "YannCoin42" and symbol "YC42".

```bash
npx hardhat test test/YannCoin42.js --grep "Deployment"
```

**Check Transfer functionality:**
Simulates a transfer between two accounts and verifies balance updates.

```bash
npx hardhat test test/YannCoin42 --grep "Transactions"
```

**Check MultiSig Contract (bonus):**
Verifies quorum requirement for a transaction.

```bash
npx hardhat test test/MultiSig.js
```


### **3. BONUS: MultiSig Live Demonstration** 🚀

To prove the security of the protocol, this script demonstrates a full transaction lifecycle on the **Sepolia Testnet**. Unlike a standard wallet, a MultiSig requires multiple approvals before moving any funds.

#### **What the script demonstrates:**

* **Dynamic Setup & Governance Handover:** * **Automatic Ownership Check:** The script verifies if the MultiSig is already the owner. If not, it performs a live `transferOwnership` from the Deployer to the MultiSig.
* **Smart Funding (Treasury Management):** It checks the MultiSig’s balance. If empty, it automatically transfers the initial supply to the MultiSig treasury.
* **Transaction Proposal:** Owner 1 submits a request to transfer tokens. At this stage, funds remain locked; the transaction is only "Pending".
* **Quorum Enforcement:** The script demonstrates that a single signature is insufficient to move funds, proving the security rules are active on the blockchain.
* **Final Confirmation & Execution:** Once the threshold (2-of-3) is met, the transaction is executed, and the transfer is finalized on-chain.

#### **How to run it**

```bash
npx hardhat run scripts/demo-multisig.js --network sepolia

```

## 5. 📍 Deployment Info (Sepolia)
* **Contract YannCoin42 Address:** `0x35A2Aec877C4D547d7d5bc884292de95939DB185`
* **Explorer:** [View on Etherscan](https://sepolia.etherscan.io/token/0x35A2Aec877C4D547d7d5bc884292de95939DB185)
* **Contract MultiSig Address:**  `0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8`
* **Explorer:** [View on Etherscan](https://sepolia.etherscan.io/address/0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8)


