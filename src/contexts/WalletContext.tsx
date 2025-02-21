
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

interface WalletContextType {
  connected: boolean;
  publicKey: PublicKey | null;
  solBalance: number;
  points: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [solBalance, setSolBalance] = useState(0);
  const [points, setPoints] = useState(0); // This will be connected to backend later

  const connection = new Connection(clusterApiUrl('devnet'));

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window as any;
      
      if (solana?.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        const pubKey = new PublicKey(response.publicKey.toString());
        setPublicKey(pubKey);
        setConnected(true);
        await updateBalance(pubKey);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBalance = async (pubKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(pubKey);
      setSolBalance(balance / 1000000000); // Convert lamports to SOL
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      
      if (!solana) {
        alert('Please install Phantom wallet!');
        return;
      }

      const response = await solana.connect();
      const pubKey = new PublicKey(response.publicKey.toString());
      setPublicKey(pubKey);
      setConnected(true);
      await updateBalance(pubKey);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window as any;
      
      if (solana) {
        await solana.disconnect();
        setPublicKey(null);
        setConnected(false);
        setSolBalance(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    setPoints(1000); // Mock points value, will be replaced with backend data
  }, []);

  return (
    <WalletContext.Provider 
      value={{
        connected,
        publicKey,
        solBalance,
        points,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
