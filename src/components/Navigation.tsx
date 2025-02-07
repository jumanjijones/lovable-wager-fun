
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateMatchButton } from "./CreateMatchButton";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const mockWalletData = {
    address: "0x1234...5678",
    balance: "1.5 ETH",
    points: 1250,
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-purple to-ocean-blue">
            Run It!
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-dark-purple/50 border-white/10 text-white">
                    <Wallet className="w-4 h-4 mr-2" />
                    {mockWalletData.address}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-dark-purple/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuLabel className="text-white">Wallet Info</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white">
                    Balance: {mockWalletData.balance}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white">
                    Points: {mockWalletData.points}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white">
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleConnect}
                className="bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
              >
                Connect Wallet
              </Button>
            )}
            <CreateMatchButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-dark-purple/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {isConnected ? (
                  <Button 
                    variant="outline"
                    className="w-full bg-dark-purple/50 border-white/10 text-white"
                    onClick={() => setIsConnected(false)}
                  >
                    Disconnect Wallet
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
                    onClick={handleConnect}
                  >
                    Connect Wallet
                  </Button>
                )}
                <CreateMatchButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
