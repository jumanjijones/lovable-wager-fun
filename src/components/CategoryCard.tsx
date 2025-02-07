
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  minStake: string;
  maxStake: string;
  onClick?: () => void;
}

export const CategoryCard = ({
  title,
  description,
  minStake,
  maxStake,
  onClick,
}: CategoryCardProps) => {
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
          <span className="text-xs font-medium text-light-purple uppercase tracking-wider">
            Stakes: {minStake} - {maxStake}
          </span>
          <h3 className="text-2xl font-semibold text-white mt-2">{title}</h3>
          <p className="text-white/70 mt-2">{description}</p>
        </div>
        
        <div className="flex items-center text-light-purple group-hover:text-ocean-blue transition-colors">
          <span className="text-sm font-medium">Enter Room</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
