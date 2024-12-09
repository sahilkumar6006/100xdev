import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js"; 

// eslint-disable-next-line react/prop-types
function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const handleClick = async () => {
    try {
      // Convert mnemonic to seed
      const seed = await mnemonicToSeed(mnemonic);

      // Derive the key at the specific path
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      // Generate the keypair
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      // Update the public keys state
      setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Add Solana Wallet</button>
      {publicKeys.map((publicKey, index) => (
        <div key={index}>{publicKey}</div>
      ))}
    </div>
  );
}

export default SolanaWallet;
