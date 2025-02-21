
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WinnersCarousel } from "./WinnersCarousel";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-purple to-ocean-blue">
            Run It!
          </a>

          {/* Winners Carousel - Hidden on mobile */}
          <div className="hidden md:block flex-1 mx-8">
            <WinnersCarousel />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={handleConnect}
              className="bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnected ? "0x1234...5678" : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
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
            className="md:hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              <WinnersCarousel />
              
              <Button 
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-light-purple to-ocean-blue text-white hover:opacity-90 transition-opacity"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnected ? "0x1234...5678" : "Connect Wallet"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
