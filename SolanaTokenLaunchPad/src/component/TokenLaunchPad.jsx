import React, { useState } from 'react';
import styles from './syles';


export function TokenLaunchpad() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [uri, setUri] = useState('');
    const [initialSupply, setInitialSupply] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    async function createToken() {
        setIsCreating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Token created successfully! (Simulated)');
        } catch (error) {
            alert('Token creation failed');
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Solana Token Launchpad</h1>
                
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Token Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Token Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Metadata URI"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="number"
                    placeholder="Initial Supply"
                    value={initialSupply}
                    onChange={(e) => setInitialSupply(e.target.value)}
                />

                <button
                    style={{
                        ...styles.button,
                        ...(isCreating ? styles.buttonDisabled : {})
                    }}
                    onClick={createToken}
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating Token...' : 'Create Token'}
                </button>
            </div>
        </div>
    );
}

export default TokenLaunchpad;