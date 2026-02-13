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