
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Share2, Telegram, Discord, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PLCardProps {
  profit: string;
  timeFrame: string;
  trades: number;
  winRate: string;
}

export const PLCard = ({ profit, timeFrame, trades, winRate }: PLCardProps) => {
  const shareMessage = `Check out my trading performance:
🚀 P&L: ${profit}
📊 Win Rate: ${winRate}
💫 Trades: ${trades}
⏱️ Time Frame: ${timeFrame}
Join me on Run It!`;

  const handleShare = async (platform: 'telegram' | 'discord' | 'twitter') => {
    let url = '';
    const encodedMessage = encodeURIComponent(shareMessage);

    switch (platform) {
      case 'telegram':
        url = `https://t.me/share/url?url=https://runit.com&text=${encodedMessage}`;
        break;
      case 'discord':
        // Discord doesn't have a direct share URL, so we'll copy to clipboard
        await navigator.clipboard.writeText(shareMessage);
        toast.success("Copied to clipboard! Share it on Discord");
        return;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
    }

    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">P&L Stats</h3>
            <p className="text-white/70">{timeFrame}</p>
          </div>
          <Share2 className="text-light-purple" size={24} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-white/70">Profit/Loss</span>
            <span className={`text-2xl font-bold ${
              profit.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {profit}
            </span>
          </div>

          <Separator className="bg-white/10" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/70">Total Trades</p>
              <p className="text-xl font-semibold text-white">{trades}</p>
            </div>
            <div>
              <p className="text-white/70">Win Rate</p>
              <p className="text-xl font-semibold text-white">{winRate}</p>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('telegram')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Telegram className="text-light-purple" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('discord')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Discord className="text-light-purple" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Twitter className="text-light-purple" size={20} />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
