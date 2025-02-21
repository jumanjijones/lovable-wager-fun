
import { useState } from "react";
import { Menu, X, Wallet, TrendingUp, LogOut, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PLCard } from "@/components/PLCard";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected, publicKey, solBalance, points, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-purple to-ocean-blue">
            Run It!
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-dark-purple/50 border-white/10 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  P&L Stats
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-purple/95 border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Your P&L Statistics</DialogTitle>
                </DialogHeader>
                <PLCard
                  profit="+2.5 SOL"
                  timeFrame="Last 30 Days"
                  trades={42}
                  winRate="68%"
                />
              </DialogContent>
            </Dialog>

            {connected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity">
                    <Wallet className="w-4 h-4 mr-2" />
                    {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-dark-purple/95 border-white/10 text-white">
                  <DropdownMenuItem className="flex items-center">
                    <Coins className="mr-2 h-4 w-4" />
                    <span>{solBalance.toFixed(2)} SOL</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span>{points} Points</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="flex items-center text-red-400" onClick={disconnectWallet}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-dark-purple/50 border-white/10 text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      P&L Stats
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-dark-purple/95 border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-white">Your P&L Statistics</DialogTitle>
                    </DialogHeader>
                    <PLCard
                      profit="+2.5 SOL"
                      timeFrame="Last 30 Days"
                      trades={42}
                      winRate="68%"
                    />
                  </DialogContent>
                </Dialog>

                {connected ? (
                  <>
                    <Button variant="outline" className="w-full bg-dark-purple/50 border-white/10 text-white">
                      <Coins className="w-4 h-4 mr-2" />
                      {solBalance.toFixed(2)} SOL
                    </Button>
                    <Button variant="outline" className="w-full bg-dark-purple/50 border-white/10 text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {points} Points
                    </Button>
                    <Button 
                      onClick={disconnectWallet}
                      className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
