
import { useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { Leaderboard } from "@/components/Leaderboard";
import { toast } from "sonner";

const Index = () => {
  const handleCategoryClick = useCallback((category: string) => {
    toast.info(`Coming soon: ${category} matches`);
  }, []);

  const categories = [
    {
      title: "Pocket Change",
      description: "Perfect for casual players and newcomers. Low stakes, high fun!",
      minStake: "0.01 ETH",
      maxStake: "0.1 ETH",
    },
    {
      title: "Big Ballers",
      description: "For serious players looking for meaningful stakes.",
      minStake: "0.1 ETH",
      maxStake: "1 ETH",
    },
    {
      title: "High Limit VIP",
      description: "Exclusive high-stakes matches for the bold.",
      minStake: "1 ETH",
      maxStake: "∞",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-purple bg-gradient-radial from-dark-purple via-dark-purple to-charcoal">
      <Navigation />
      <Leaderboard />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-16 animate-fade-down">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-light-purple to-ocean-blue">
            Welcome to Run It!
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            The premier decentralized wagering platform. Choose your category and start playing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
