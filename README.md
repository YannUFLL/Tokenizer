# Tokenizer - YannCoin42 (YC42)

## 📌 Project Overview

The goal was to build, test, and deploy a custom digital asset on a public blockchain while adhering to the **ERC-20** industry standards.

**YannCoin42 (YC42)** YannCoin42 (YC42) is a decentralized digital asset developed to explore the architecture of smart contracts and on-chain governance. Deployed on the Ethereum Sepolia Testnet, this project demonstrates the implementation of a secure, governed token ecosystem adhering to the ERC-20 industry standard.

Beyond a simple token, the project focuses on institutional-grade security by separating the asset logic from its administrative power through a custom-built governance laye


**Multi-Signature Governance (bonus)**

To eliminate any "Single Point of Failure", I developed and deployed a custom Multi-Signature (MultiSig) wallet. This contract acts as the official owner of the YC42 token.

For any sensitive operation—such as adjusting the total supply—a majority of owners must sign the transaction on-chain. This architecture demonstrates a professional-grade security layer, mirroring the standards used by major protocols like Gnosis Safe to ensure decentralized and secure asset management.

---

## 📂 Repository Structure

The project is organized into three main directories to ensure clarity and scannability:

* **[`/code`](./code)**: Contains the full Hardhat development environment, including the Solidity smart contract, automated unit tests, and the Ignition deployment modules.
* **[`/deployment`](./deployment)**: Technical guide for compiling and deploying the smart contract using Hardhat.
* **[`/documentation`](./documentation)**: Project Whitepaper and Step-by-Step User Guide for MetaMask interaction.


## 📍 Live Deployment Info

* **Network:** Ethereum Sepolia Testnet
* **Contract YannCoin42 Address:** `0x35A2Aec877C4D547d7d5bc884292de95939DB185`
* **Explorer:** [View on Etherscan](=https://sepolia.etherscan.io/address/0x35A2Aec877C4D547d7d5bc884292de95939DB185)
* **Contract MultiSig Address:**  `0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8`
* **Explorer:** [View on Etherscan](https://sepolia.etherscan.io/address/0xe7fC13C36CA3c37F2525815f61a2bA5755aC37A8)


## 🛠 Tech Stack & Design Choices

* **Language: Solidity 0.8.20** Chosen for its stability and compatibility with the latest EVM features. This version includes native overflow protection, reducing the need for external math libraries.

* **Framework: Hardhat + Ignition**

    * **Automation:** Hardhat provides a robust environment for smart contract automation.

    * **Network Abstraction:** It allows switching between networks (Local, Sepolia, Mainnet) seamlessly via a simple CLI flag (`--network`), without modifying a single line of code.

    * **Account Management:** Hardhat automatically provides and manages accounts for each environment—whether using default local accounts or securely configured private keys in `hardhat.config.js`. This ensures that all scripts and contracts remain **network-agnostic** and portable.

    * **Ignition:** Used for "declarative" deployments, ensuring reliable state management and automated contract verification on Etherscan.
   
    * **Security: Hardhat Configuration Variables (`vars`)** To avoid the security risks of `.env` files (such as accidental leaks to GitHub), I managed sensitive data like private keys and owner addresses using Hardhat’s built-in encrypted variable storage.

    * **Quality Assurance: Mocha & Chai** A comprehensive test suite was developed using **Mocha** and **Chai**. These tests validate critical logic such as access control (`onlyOwner`), quorum requirements, and protection against reentrancy.


* **Library: OpenZeppelin (ERC20 Standard)** Industry-standard library used for the `YannCoin42` token. Inheriting from `ERC20.sol` ensures 100% compatibility with wallets (MetaMask) and exchanges while guaranteeing audited security.

* **Network: Ethereum Sepolia Testnet** The contract was deployed and verified on Sepolia to demonstrate its real-world lifecycle. This allows for a full end-to-end demonstration (Submit → Confirm → Execute) on a live explorer.

* **Funding: Sepolia PoW Faucet** To obtain test ETH, I used a Proof-of-Work faucet. This required running a local mining process to solve computational puzzles in exchange for Sepolia ETH, ensuring a reliable supply for deployment and transaction fees without depending on traditional "click-and-claim" faucets.

* **Architecture: Ownership Transfer & Governance** Post-deployment, the ownership of the `YannCoin42` contract was transferred to the `MultiSig` contract. This ensures that no single private key (not even the deployer's) can unilaterally mint or burn tokens. Every administrative action must pass through the MultiSig's internal voting logic.

* **Logic: Multi-Step Transaction Lifecycle** The MultiSig implementation follows a **Proposal -> Confirmation -> Execution** flow. This asynchronous process is a critical security standard in DeFi to prevent "fat-finger" errors and unauthorized transfers.

