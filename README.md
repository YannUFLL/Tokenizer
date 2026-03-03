# Tokenizer - YannCoin42 (YC42)

## 🌐 Market Research: Finding the Professional Standard

When starting the **Tokenizer** project, my research focused on identifying the most reliable ecosystem for a high-stakes financial asset. While several platforms exist, I narrowed my study down to the two primary industry leaders: **Ethereum (EVM)** and **Solana**.

### ⚖️ The Decision Funnel: Why Ethereum?

My initial analysis was a head-to-head comparison to determine which environment was best suited for a first professional-grade token. I intentionally moved away from other alternatives for specific strategic reasons:

* **BNB Chain (BSC):** Often perceived as a "centralized clone" of Ethereum. While functional, it lacks the prestige and pure decentralization of the original EVM.
* **Cardano & Polkadot:** These ecosystems use highly academic languages (Haskell/Rust variant). For a first implementation, the complexity of their architectures felt like "using a jet engine to power a car"—overly complex for a standard token.
* **Layer 2s (Polygon, Base, Arbitrum):** At the time of my early research, that seemed quite obscure to me and diffcult to understand globaly.

### 🧠 The Solidity vs. Rust Dichotomy

The final choice between Ethereum and Solana came down to **Language Ergonomics vs. Raw Speed**:

* **Solidity (Ethereum):** A "High-Level" language specifically designed for the EVM. Its syntax is intuitive for managing blockchain concepts (`address`, `mapping`, `msg.sender`). It allowed me to focus 100% on **business logic** and security rather than hardware-level memory management.
* **Rust (Solana):** While extremely fast, Rust is a "Low-Level" general-purpose language. On Solana, you must manually manage "Account" ownership and data serialization. For a first smart contract, the risk of a critical logic bug due to this technical overhead is significantly higher.

### 🎯 Final Decision: Stability over Hype

While Solana is trending for its low fees, I prioritized **professionalism and security**. The existence of **OpenZeppelin** on Ethereum acted as my "Safety Net"—providing a standardized, audited, and battle-tested framework that simply has no equivalent of this magnitude on Solana.

* **Result:** Choosing Solidity ensured **code clarity and maintainability**, making `YannCoin42` easier to audit and less prone to the "boilerplate" errors common in early-stage Solana programs.

---

## 🛡️ BONUS: Multi-Signature Governance

To eliminate any "Single Point of Failure", I developed as requested in bonus a custom Multi-Signature (MultiSig) wallet. This contract acts as the official owner of the YC42 token.

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

