
import { useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { Leaderboard } from "@/components/Leaderboard";
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
      description: "Perfect for casual players and newcomers. Low stakes, high fun!",
      minEntry: "1",
      maxEntry: "100",
      poolValue: "1,234",
      activeMatches: [
        { id: 1, game: "Coin Toss", players: 2, maxPlayers: 2, stake: "$50", timeLimit: "5 min" },
        { id: 2, game: "Card Draw", players: 1, maxPlayers: 2, stake: "$25", timeLimit: "No limit" },
      ]
    },
    {
      title: "Big Ballers",
      description: "For serious players looking for meaningful stakes.",
      minEntry: "101",
      maxEntry: "10,000",
      poolValue: "25,650",
      activeMatches: [
        { id: 3, game: "Random Shuffle", players: 2, maxPlayers: 4, stake: "$500", timeLimit: "10 min" },
      ]
    },
    {
      title: "High Limit VIP",
      description: "Exclusive high-stakes matches for the bold.",
      minEntry: "10,001",
      maxEntry: "∞",
      poolValue: "156,780",
      activeMatches: []
    },
  ];

  const handleJoinMatch = useCallback((matchId: number, currentPlayers: number, maxPlayers: number) => {
    if (currentPlayers >= maxPlayers) {
      toast({
        variant: "destructive",
        title: "Match is full",
        description: "This match has reached its maximum number of players.",
      });
      return;
    }

    console.log(`Joining match ${matchId}`);
    toast({
      title: "Joining match...",
      description: "You are being added to the match.",
    });
    // Add join match logic here
  }, [toast]);

  return (
    <div className="min-h-screen bg-dark-purple bg-gradient-radial from-dark-purple via-dark-purple to-charcoal">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-8 animate-fade-down">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-light-purple to-ocean-blue">
            Welcome to Run It!
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The premier Solana wagering platform. Choose your category and start playing!
          </p>
          
          <div className="flex justify-center mb-8">
            <CreateMatchButton />
          </div>
        </div>

        <div className="mb-8">
          <Leaderboard />
        </div>

        <div className="grid gap-16 animate-fade-up">
          {categories.map((category) => (
            <div key={category.title} className="space-y-6">
              <CategoryCard
                title={category.title}
                description={category.description}
                minEntry={category.minEntry}
                maxEntry={category.maxEntry}
                poolValue={category.poolValue}
              />
              
              {category.activeMatches.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4">
                  {category.activeMatches.map((match) => (
                    <motion.div
                      key={match.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`relative p-4 bg-white/5 backdrop-blur-xl border-white/10 cursor-pointer group ${
                          match.players >= match.maxPlayers ? 'opacity-50' : ''
                        }`}
                        onClick={() => handleJoinMatch(match.id, match.players, match.maxPlayers)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-light-purple">
                              {match.game}
                            </span>
                            <span className="text-sm text-white/70">
                              {match.timeLimit}
                            </span>
                          </div>
                          <Separator className="bg-white/10" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-white/70" />
                              <span className="text-sm text-white/70">
                                {match.players}/{match.maxPlayers} players
                              </span>
                            </div>
                            <span className="text-sm font-medium text-ocean-blue">
                              {match.stake}
                            </span>
                          </div>
                          {match.players >= match.maxPlayers && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                              <span className="text-white font-medium">Match Full</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
