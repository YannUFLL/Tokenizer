# Tokenizer - YannCoin42 (YC42)

## 📌 Project Overview
This project was developed as part of the **42 x BNB Chain** partnership. The goal was to build, test, and deploy a custom digital asset on a public blockchain while adhering to the **ERC-20 (BEP-20)** industry standards.

**YannCoin42 (YC42)** is a fixed-supply token deployed on the **Ethereum Sepolia Testnet**, representing a secure and immutable asset within the 42 ecosystem.

---

## 📂 Repository Structure

The project is organized into three main directories to ensure clarity and scannability:

* **[`/code`](./code)**: Contains the full Hardhat development environment, including the Solidity smart contract, automated unit tests, and the Ignition deployment modules.
* **[`/deployment`](./deployment)**: Technical guide for compiling and deploying the smart contract using Hardhat.
* **[`/documentation`](./documentation)**: Project Whitepaper and Step-by-Step User Guide for MetaMask interaction.


## 📍 Live Deployment Info

* **Network:** Ethereum Sepolia Testnet
* **Contract Address:** `0x005942821558a8a837cB25C5B34695a6855c6672`
* **Explorer:** [View on Etherscan](https://www.google.com/search?q=https://sepolia.etherscan.io/address/0x005942821558a8a837cB25C5B34695a6855c6672)

## 🛠 Tech Stack & Design Choices

* **Language: Solidity 0.8.20** Chosen for its stability and compatibility with the latest EVM features. This version includes native overflow protection, reducing the need for external math libraries.
* **Framework: Hardhat + Ignition** Hardhat provides a robust environment for automation. I used **Ignition** for "declarative" deployments, ensuring reliable state management and automated contract verification on Etherscan.
* **Library: OpenZeppelin (ERC20 Standard)** Industry-standard library used for the `YannCoin42` token. Inheriting from `ERC20.sol` ensures 100% compatibility with wallets (MetaMask) and exchanges while guaranteeing audited security.
* **Security: Hardhat Configuration Variables (`vars`)** To avoid the security risks of `.env` files (such as accidental leaks to GitHub), I managed sensitive data like private keys and owner addresses using Hardhat’s built-in encrypted variable storage.
* **Quality Assurance: Mocha & Chai** A comprehensive test suite was developed using **Mocha** and **Chai**. These tests validate critical logic such as access control (`onlyOwner`), quorum requirements, and protection against reentrancy.
* **Network: Ethereum Sepolia Testnet** The contract was deployed and verified on Sepolia to demonstrate its real-world lifecycle. This allows for a full end-to-end demonstration (Submit → Confirm → Execute) on a live explorer.
* **Funding: Sepolia PoW Faucet** To obtain test ETH, I used a Proof-of-Work faucet. This required running a local mining process to solve computational puzzles in exchange for Sepolia ETH, ensuring a reliable supply for deployment and transaction fees without depending on traditional "click-and-claim" faucets.

