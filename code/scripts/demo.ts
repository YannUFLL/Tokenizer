import hre from 'hardhat'
import { parseEther } from 'viem'

async function main() {
  // L'adresse que tu as obtenue après le déploiement
  const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

  const token = await hre.viem.getContractAt('MyToken42', CONTRACT_ADDRESS)
  const [owner] = await hre.viem.getWalletClients()

  console.log('--- DÉMONSTRATION DU TOKEN ---')

  // 1. Lire le nom
  const name = await token.read.name()
  console.log(`Token Name: ${name}`)

  // 2. Vérifier le solde de l'owner
  const balance = await token.read.balanceOf([owner.account.address])
  console.log(`Balance actuelle: ${balance.toString()} wei`)

  // 3. Optionnel: Faire un transfert
  // const hash = await token.write.transfer(["0xADRESSE_DESTINATAIRE", parseEther("10")]);
  // console.log(`Transfert envoyé! Hash: ${hash}`);
}

main().catch(console.error)
