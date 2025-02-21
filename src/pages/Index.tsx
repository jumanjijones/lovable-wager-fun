
import { Navigation } from "@/components/Navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { CreateMatchButton } from "@/components/CreateMatchButton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const categories = [
    {
      title: "Pocket Change",
      subtitle: "Low Stake - High Fun",
      description: "Perfect for casual players and newcomers",
      minEntry: "1",
      maxEntry: "100",
      activeMatches: Array(7).fill({
        id: 1,
        game: "Coin Flip",
        players: 1,
        maxPlayers: 2,
        stake: "$50",
        timeLimit: "5 min"
      })
    },
    {
      title: "Ballers",
      subtitle: "Risk Takers",
      description: "For serious players looking for meaningful stakes",
      minEntry: "101",
      maxEntry: "10,000",
      activeMatches: Array(7).fill({
        id: 2,
        game: "Card Draw",
        players: 2,
        maxPlayers: 4,
        stake: "$500",
        timeLimit: "10 min"
      })
    },
    {
      title: "High Limit VIP",
      subtitle: "Mental Issues",
      description: "Exclusive high-stakes matches for the bold",
      minEntry: "10,001",
      maxEntry: "∞",
      activeMatches: Array(7).fill({
        id: 3,
        game: "Random Shuffle",
        players: 1,
        maxPlayers: 2,
        stake: "$10,000",
        timeLimit: "No limit"
      })
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-purple to-ocean-blue mb-8">
            Just RUN IT!
          </h1>
          <CreateMatchButton />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <CategoryCard
                title={category.title}
                description={category.description}
                subtitle={category.subtitle}
                minEntry={category.minEntry}
                maxEntry={category.maxEntry}
              />
              
              <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {category.activeMatches.map((match, matchIndex) => (
                  <motion.div
                    key={matchIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-light-purple">
                            {match.game}
                          </span>
                          <span className="text-sm text-foreground/70">
                            {match.timeLimit}
                          </span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-foreground/70" />
                            <span className="text-sm text-foreground/70">
                              {match.players}/{match.maxPlayers}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-ocean-blue">
                            {match.stake}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
