# **🚀 Getting Started with YannCoin42**

This project is a Web3 token implementation (BEP-20/ERC-20) built with **Hardhat** and **Viem**. Follow these steps to clone, install, and deploy the project.

## **📋 Prerequisites**

Ensure you have the following installed:

* **Node.js** (v18 or newer)  
* **npm**  
* A MetaMask wallet with **Sepolia ETH** (or tBNB)

---

## **🛠️ Installation & Setup**

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

```bash 
npx hardhat vars set SEPOLIA_RPC_URL 
```


\# Set your MetaMask Private Key (Account must have testnet tokens)

```bash 
npx hardhat vars set SEPOLIA_PRIVATE_KEY 
```

**Note:** These variables are stored locally on your machine, outside of the repository, ensuring zero risk of leaking keys to GitHub.

### **3\. Contract compilation **

```bash
npx hardhat compile contract/YannCoin42.sol
```


## **🚀 Deployment**

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

```
npx hardhat ignition deploy ignition/modules/YannCoin42.js --network sepolia
```

## **🧪 Interactions & Demonstration**

Once deployed, you can run some tests to see for exemple is your contrate is on the network

**Check deployement contrat:**

\# for local test (Hardhat Network):

```bash
npx hardhat test test/YannCoin42.js --network 
localhost -grep "correct value"
```

\# for sepolia test:
```bash
npx hardhat test test/YannCoin42.js --network sepolia -grep "correct value"
```

**Check transfert functionnality:**

\# For local test:
```bash
npx hardhat test test/YannCoin42.js --network 
localhost -grep "transfert"
```

\# Pour tester sur un réseau spécifique (ex: Sepolia ou BSC Testnet)
```bash
npx hardhat test test/YannCoin42.js --network sepolia -grep "transfert"
```

