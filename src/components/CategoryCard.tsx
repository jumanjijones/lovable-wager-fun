
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  description: string;
  minEntry: string;
  maxEntry: string;
  onClick?: () => void;
}

export const CategoryCard = ({
  title,
  subtitle,
  description,
  minEntry,
  maxEntry,
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />
      
      {/* Card content */}
      <div className="relative space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <span className="text-xs font-medium text-ocean-blue">
            ${minEntry} - ${maxEntry}
          </span>
        </div>
        <p className="text-sm font-medium text-light-purple">{subtitle}</p>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
    </motion.div>
  );
};
