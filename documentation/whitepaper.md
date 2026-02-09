# 📄 Whitepaper: YannCoin42 (YC42)

## 1. Concept & Vision

**YannCoin42** is an experimental digital asset created as part of the *Tokenizer* project at 42.

The concept is based on creating a digital currency that is **deflationary by nature** (via a fixed supply) and **immutable**. The number "42" is at the core of the token's identity, symbolizing the "Answer to the Ultimate Question of Life, the Universe, and Everything," while paying homage to the 42 school ecosystem.

The vision behind YC42 was to explore the constraints of decentralized ledger technology (DLT) and master the implementation of industry-standard protocols.

### Token Specifications:

* **Total Supply:** 1,000,000 YC42 (Fixed supply, no further `minting` possible).
* **Standard:** ERC-20 (fully compatible with BNB Chain's BEP-20).
* **Test Network:** Sepolia (Ethereum Testnet).


## 2. User Guide: MetaMask Setup

Properly displaying a custom token can be tricky. This guide ensures you avoid common UI errors regarding token units.

### 🛠️ Step 1: Adding the Token (Fixing the Unit Display)

If you add the token and MetaMask displays `0.0000...` or an astronomical number, the **decimals** are likely misconfigured in the interface.

1. Open **MetaMask**.
2. Click on the **sidebar menu** (3 bars).
3. Go to **Settings** -> **Advanced**.
4. Activate **"Show test networks"**.
5. Return to the **Home** screen.
6. Navigate to the **Tokens** tab.
7. Click on the **three dots** and select **Import Tokens**.
8. Ensure the **Sepolia** blockchain is selected.
9. Select the **Custom Token** tab.
10. Paste the Contract Address: `0x005942821558a8a837cB25C5B34695a6855c6672`.
11. Enter the symbol: **YC42**.
12. Confirm the import. You should now see your correct balance (e.g., `1,000,000 YC42`).
13. If the **token decimals** do not autofill correctly, manually enter **18**.

### 💸 Step 2: Sending YC42

To transfer tokens to another student or a peer-evaluator:

1. On the MetaMask home screen, click on the **YC42** token.
2. Click the **Send** button.
3. Paste the recipient's address (or choose "Transfer between my accounts" for testing).
4. Enter the amount (e.g., `42`).
5. **Note:** You must hold a small amount of **Sepolia ETH** (Gas) to pay for the transaction.
6. Confirm the transaction and wait a few seconds for blockchain validation.


## 3. Security & Architecture

The source code utilizes the **OpenZeppelin** library, the global industry standard for Smart Contract security.

* **Internal Audit:** The contract exposes no `public` functions to modify the total supply after deployment.
* **Transparency:** The code is verified on the block explorer, allowing anyone to audit the functions and ensure there are no "backdoors."
* **Reliability:** By inheriting from the ERC-20 standard, YC42 is compatible with all decentralized exchanges (DEX) and Web3 wallets.


## 4. Useful Links

* **Contract Address:** `0x005942821558a8a837cB25C5B34695a6855c6672`
* **Block Explorer:** [View on Etherscan](https://sepolia.etherscan.io/address/0x005942821558a8a837cB25C5B34695a6855c6672)


## 5. Technical Characteristics
 
 
 * **Standard:** ERC-20 (OpenZeppelin implementation).
 * **Fixed Supply:** 1,000,000 YC42.
 * **Decimals:** 18 (matching Ethereum's  precision).
 * **Supply Policy:** The total supply is minted during the deployment phase. Since the `_mint` function is `internal` and only invoked within the `constructor`, no additional tokens can be generated post-deployment. The supply is **hard-capped** and immutable.
 * **Burnable:** No burn function is exposed, meaning the supply will remain constant at 1M.
