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

* **Language: Solidity 0.8.20** Chosen for its stability and compatibility with the latest EVM (Ethereum Virtual Machine) features. Using a recent version ensures protection against common legacy overflow issues.
* **Framework: Hardhat + Ignition** Hardhat was selected for its robust testing environment. I used **Ignition** to manage deployments because it ensures "declarative" deployments—meaning it automatically handles contract verification on Etherscan and manages deployment states reliably.
* **Library: OpenZeppelin (ERC20 Standard)** Industry-standard library used to guarantee security. By inheriting from OpenZeppelin’s `ERC20.sol`, the token is protected against common vulnerabilities (like reentrancy or mathematical errors) and is 100% compatible with wallets like MetaMask and exchanges.
* **Network: Ethereum Sepolia Testnet** Selected as the most reliable environment for smart contract testing. It provides a realistic simulation of the Ethereum Mainnet without requiring real funds, allowing for a full demonstration of the token's lifecycle.
