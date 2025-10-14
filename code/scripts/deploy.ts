import { createWalletClient, http, publicActions } from 'viem'
import { hardhat } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import {
  abi,
  bytecode,
} from '../artifacts/contracts/ShlingueCoin42.sol/artifacts.json.js'

async function main() {
  const account = privateKeyToAccount(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  )

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http('http://127.0.0.1:8545'),
  }).extend(publicActions)

  const hash = await client.deployContract({
    abi,
    bytecode,
    args: [1000], // approvisionnement initial
  })

  const receipt = await client.waitForTransactionReceipt({ hash })
  console.log('Token déployé à:', receipt.contractAddress)
}

main().catch(console.error)
