
import { useState, useCallback, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137] // Ethereum, BSC, Polygon
});

export const WalletConnect = () => {
  const [phantomWallet, setPhantomWallet] = useState<any>(null);
  const { account, activate, deactivate } = useWeb3React();
  const { toast } = useToast();

  useEffect(() => {
    if ("solana" in window) {
      setPhantomWallet(window.solana);
    }
  }, []);

  const connectPhantom = useCallback(async () => {
    try {
      if (phantomWallet) {
        await phantomWallet.connect();
        toast({
          title: "Connected to Phantom",
          description: "Successfully connected to Phantom wallet",
        });
      } else {
        window.open("https://phantom.app/", "_blank");
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Phantom wallet",
        variant: "destructive",
      });
    }
  }, [phantomWallet, toast]);

  const connectMetaMask = useCallback(async () => {
    try {
      await activate(injected);
      toast({
        title: "Connected to MetaMask",
        description: "Successfully connected to MetaMask wallet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask",
        variant: "destructive",
      });
    }
  }, [activate, toast]);

  return (
    <div className="flex gap-2">
      <Button
        onClick={connectPhantom}
        className="bg-gradient-to-r from-[#AB9FF2] to-[#F299F2]"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {phantomWallet?.connected ? "Phantom Connected" : "Connect Phantom"}
      </Button>
      <Button
        onClick={connectMetaMask}
        className="bg-gradient-to-r from-[#F6851B] to-[#E2761B]"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {account ? "MetaMask Connected" : "Connect MetaMask"}
      </Button>
    </div>
  );
};
