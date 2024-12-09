import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './components/RequestAirdrop';
function App() {
  return (
    <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/wwDruBIMUbkBfteO3-Fs06DM-rItaD92'}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
               < WalletMultiButton/>
               <WalletDisconnectButton />
               <div>
                hi there <b> hello</b>
               </div>
               <RequestAirdrop/>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  )
}

export default App
