# Tokenizer - YannCoin42 (YC42)

## 📌 Project Overview
This project was developed as part of the **42 x BNB Chain** partnership. The goal was to build, test, and deploy a custom digital asset on a public blockchain while adhering to the **ERC-20 (BEP-20)** industry standards.

**YannCoin42 (YC42)** is a fixed-supply token deployed on the **Ethereum Sepolia Testnet**, representing a secure and immutable asset within the 42 ecosystem.

---

## 📂 Repository Structure

The project is organized into three main directories to ensure clarity and scannability:

* **[`/code`](./code)**: Contains the full Hardhat development environment, including the Solidity smart contract, automated unit tests, and the Ignition deployment modules.
* **[`/deployment`](./deployment)**: Includes technical details of the public deployment, contract addresses, and a step-by-step guide on how to interact with the contract on the blockchain.
* **[`/documentation`](./documentation)**: Features the project **Whitepaper**, the conceptual vision, and a troubleshooting guide for users (including MetaMask setup).

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- A MetaMask wallet with Sepolia ETH.

### 2. Local Testing
To verify the contract logic without spending gas, run the automated test suite:
```bash
cd code
npm install
npx hardhat test