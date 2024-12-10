import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import {TokenLaunchpad} from './component/TokenLaunchPad'

function App() {
  return (
    <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/wwDruBIMUbkBfteO3-Fs06DM-rItaD92'}>
    <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            display: 'flex',
             padding:20,
            justifyContent: 'space-between',
        
          }}>
          < WalletMultiButton/>
          <WalletDisconnectButton />
            </div>
          <TokenLaunchpad/>
        </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
  )
}

export default App
