# 📄 Whitepaper: YannCoin42 (YC42)

## 1. Concept & Vision

**YannCoin42** is an experimental digital asset created as part of the *Tokenizer* project at 42.

The concept is based on creating a digital currency that balances scarcity with governance. While the supply is initialized at 1,000,000 units, the contract includes Mint and Burn capabilities. This allows the owner (or multiple owners via the MultiSig governance in the bonus) to adapt the monetary policy (e.g., offsetting loss or managing ecosystem growth) while maintaining the token's immutability regarding its core logic.

The vision behind YC42 was to explore the constraints of decentralized ledger technology (DLT) and master the implementation of industry-standard protocols.

### Token Specifications:

* **Initial Supply:** 1,000,000 YC42.
* **Standard:** ERC-20.
* **Test Network:** Sepolia (Ethereum Testnet).


## 2. User Guide: MetaMask Setup

Properly displaying a custom token can be tricky. This guide ensures you avoid common UI errors regarding token unitso


### 🛠️ Step 1: Adding the Token

1. Open **MetaMask**.
2. Click on the **sidebar menu** (3 bars).
3. Go to **Settings** -> **Advanced**.
4. Activate **"Show test networks"**.
5. Return to the **Home** screen.
6. Navigate to the **Tokens** tab.
7. Click on the **three dots** and select **Import Tokens**.
8. Ensure the **Sepolia** blockchain is selected.
9. Select the **Custom Token** tab.
10. Paste the Contract Address: `0x35A2Aec877C4D547d7d5bc884292de95939DB185`.
11. Enter the symbol: **YC42**.
12. Confirm the import. You should now see your correct balance (e.g., `1,000,000 YC42`).
13. If the **token decimals** do not autofill correctly, manually enter **18**.

If you add the token and MetaMask displays `0.0000...` or an astronomical number, the **decimals** are likely misconfigured in the interface.


### 💸 Step 2: Sending YC42

To transfer tokens to another student or a peer-evaluator:

1. On the MetaMask home screen, click on the **YC42** token.
2. Click the **Send** button.
3. Paste the recipient's address (or choose "Transfer between my accounts" for testing).
4. Enter the amount (e.g., `42`).
5. **Note:** You must hold a small amount of **Sepolia ETH** (Gas) to pay for the transaction.
6. Confirm the transaction and wait a few seconds for blockchain validation.


## 3. Security & Architecture

* **Controlled Inflation/Deflation:** The total supply can be adjusted via `mint` and `burn` functions. These are strictly protected by the `onlyOwner` modifier, ensuring the integrity of the token's value.
* **Decentralized Custody (Bonus):** To eliminate the "Single Point of Failure" inherent in standard wallets, administrative control (contract onlyOwner) has been transferred to a custom **Multi-Signature (MultiSig) Vault**.

    * **Consensus-Based Governance:** Critical operations—such as supply adjustments or ownership changes—require a **2-of-3 consensus** from independent authorized signers.

    * **Enhanced Security:** This architecture ensures that even if a private key is compromised, the protocol remains secure, mirroring the custody standards of major institutional DeFi protocols.

* **Transparency & Trust:** The source code is fully **verified on Etherscan**, allowing for public auditing of all functions and ensuring there are no hidden "backdoors" or central points of control.
  
* **Ecosystem Compatibility:** Built on the OpenZeppelin ERC-20 framework, YC42 is natively compatible with the entire Ethereum ecosystem, including MetaMask, hardware wallets, and Decentralized Exchanges (DEX).

## 4. Technical Interface (ERC-20 & Security)

### 🔹 Public Read Functions (View)

* **`name()`**: Returns the full name of the token (`YannCoin42`).
* **`symbol()`**: Returns the ticker (`YC42`).
* **`decimals()`**: Returns the number of decimals used (default is **18**).
* **`totalSupply()`**: Returns the total amount of tokens currently in existence.
* **`balanceOf(address account)`**: Returns the token balance of a specific wallet address.
* **`allowance(address owner, address spender)`**: Returns the remaining number of tokens that a `spender` is allowed to withdraw from the `owner`'s wallet.

### 🔸 Standard Transactions (Write)

* **`transfer(address to, uint256 value)`**: Moves `value` tokens from your wallet to the recipient. Returns a boolean.
* **`approve(address spender, uint256 value)`**: Grants permission to a `spender` (like a DEX) to move up to `value` tokens from your wallet.
* **`transferFrom(address from, address to, uint256 value)`**: Moves tokens using the allowance mechanism. This is the core function for decentralized applications (dApps).

### 🔸 Administrative & Security Functions (Owner Only)

* **`mint(address to, uint256 amount)`**: Creates new tokens and sends them to the specified address. Protected by the `onlyOwner` modifier.
* **`burn(uint256 amount)`**: Destroys tokens from the caller's wallet, reducing the total supply.
* **`transferOwnership(address newOwner)`**: Transfers administrative rights (e.g., to the MultiSig vault).
* **`owner()`**: Returns the address of the current contract owner (The MultiSig wallet in our case).

### 📢 Blockchain Events (Logs)

These events are emitted on-chain and allow interfaces like MetaMask or Etherscan to track movements in real-time:

* **`Transfer(address indexed from, address indexed to, uint256 value)`**: Triggered on every token movement.
* **`Approval(address indexed owner, address indexed spender, uint256 value)`**: Triggered when a new allowance is set.
* **`OwnershipTransferred(address indexed previousOwner, address indexed newOwner)`**: Triggered when the administrative control changes.

---

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

