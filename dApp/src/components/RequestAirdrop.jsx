import { useConnection, useWallet } from "@solana/wallet-adapter-react"
function RequestAirdrop() {
  const wallet = useWallet();
  const {connection} = useConnection();
  // alert(wallet.publicKey)

  const sendAirdropToUser = async() => {
  const response =  await connection.requestAirdrop(wallet.publicKey, 1000000000)
  alert(response)
  }
  return (

    <div>
      <h1>Request Airdrop</h1>
      <h1> {wallet.publicKey?.toBase58() || 'Not Connected'}</h1>
      <input type="text" placeholder='Amount' />
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  )
}

export default RequestAirdrop
