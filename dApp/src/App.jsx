import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { SendTokens } from './SendTokens';
import { SignMessage } from './SignMessage';
function App() {
  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                <SignMessage />
                <SendTokens />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  )
}

export default App
