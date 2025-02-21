
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  minEntry: string;
  maxEntry: string;
  poolValue: string;
  onClick?: () => void;
}

export const CategoryCard = ({
  title,
  description,
  minEntry,
  maxEntry,
  poolValue,
  onClick,
}: CategoryCardProps) => {
  const subtitles: { [key: string]: string } = {
    "Pocket Change": "Low Stake - High Fun",
    "Ballers": "Risk Takers",
    "High Limit VIP": "Mental Issues"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative p-6 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Gradient background with glass effect */}
      <div className="absolute inset-0 bg-gradient-card opacity-10" />
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />
      
      {/* Card content */}
      <div className="relative flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-light-purple uppercase tracking-wider">
              Entry: ${minEntry} - ${maxEntry}
            </span>
            <span className="text-xs font-medium text-ocean-blue uppercase tracking-wider">
              Pool: ${poolValue}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-white mt-2">{title}</h3>
          <p className="text-sm font-medium text-ocean-blue mt-1">{subtitles[title]}</p>
          <p className="text-white/70 mt-2">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
