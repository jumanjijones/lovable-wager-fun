
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  minStake: string;
  maxStake: string;
  onClick: () => void;
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-medium text-gold/80 uppercase tracking-wider">
            Stakes: {minStake} - {maxStake}
          </span>
          <h3 className="text-2xl font-semibold text-charcoal mt-2">{title}</h3>
          <p className="text-charcoal/70 mt-2">{description}</p>
        </div>
        
        <div className="flex items-center text-gold hover:text-gold/80 transition-colors">
          <span className="text-sm font-medium">Enter Room</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
