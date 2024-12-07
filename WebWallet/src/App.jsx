import { generateMnemonic } from 'bip39';
import React from 'react'
import EthWallet from './component/EthWallet.jsx'
import SolanaWallet from './component/SolanaWallet.jsx'
function App() {
  const [mnemonic, setMnemonic] = React.useState('');
  return (
    <div>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn);
      }} >Create Seed Phrase</button>
      
      <input type='text' value={mnemonic}></input>

      <EthWallet mnemonic={mnemonic} />
      <SolanaWallet mnemonic={mnemonic} />
    </div>
  )
}

export default App
