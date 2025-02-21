
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useToast } from "@/components/ui/use-toast";

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
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  const connection = new Connection(clusterApiUrl('devnet'));

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = (window as any).phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
    throw new Error('Please install Phantom wallet!');
  };

  const updateBalance = async (pubKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(pubKey);
      setSolBalance(balance / 1000000000); // Convert lamports to SOL
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch wallet balance",
      });
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const provider = getProvider();
      
      const resp = await provider.connect({ onlyIfTrusted: true });
      const pubKey = new PublicKey(resp.publicKey.toString());
      
      setPublicKey(pubKey);
      setConnected(true);
      await updateBalance(pubKey);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been automatically connected",
      });
    } catch (error) {
      // Silent error for not trusted connection
      console.log("Not previously connected:", error);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = getProvider();

      const resp = await provider.connect();
      const pubKey = new PublicKey(resp.publicKey.toString());
      
      setPublicKey(pubKey);
      setConnected(true);
      await updateBalance(pubKey);
      
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      const provider = getProvider();
      await provider.disconnect();
      
      setPublicKey(null);
      setConnected(false);
      setSolBalance(0);
      
      toast({
        title: "Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disconnect wallet",
      });
    }
  };

  useEffect(() => {
    window.addEventListener('load', checkIfWalletIsConnected);
    return () => window.removeEventListener('load', checkIfWalletIsConnected);
  }, []);

  // Listen for account changes
  useEffect(() => {
    const provider = (window as any).phantom?.solana;
    
    if (provider) {
      provider.on('accountChanged', async (publicKey: PublicKey | null) => {
        if (publicKey) {
          setPublicKey(new PublicKey(publicKey.toString()));
          await updateBalance(new PublicKey(publicKey.toString()));
        } else {
          // Handle disconnect
          setPublicKey(null);
          setConnected(false);
          setSolBalance(0);
        }
      });
    }
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
