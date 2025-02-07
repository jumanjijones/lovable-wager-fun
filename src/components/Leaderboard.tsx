
import { Trophy, Award } from "lucide-react";
import { Card } from "./ui/card";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  winRate: string;
}

interface RecentMatch {
  winner: string;
  amount: string;
  game: string;
  timestamp: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", points: 2500, winRate: "75%" },
  { rank: 2, username: "BlockMaster", points: 2200, winRate: "70%" },
  { rank: 3, username: "Web3Pro", points: 2000, winRate: "68%" },
  { rank: 4, username: "SolanaWhale", points: 1800, winRate: "65%" },
  { rank: 5, username: "CoinFlipPro", points: 1600, winRate: "62%" },
  { rank: 6, username: "BitLord", points: 1500, winRate: "60%" },
  { rank: 7, username: "ChainMaster", points: 1400, winRate: "58%" },
  { rank: 8, username: "TokenKing", points: 1300, winRate: "56%" },
  { rank: 9, username: "CryptoQueen", points: 1200, winRate: "54%" },
  { rank: 10, username: "BlockChampion", points: 1100, winRate: "52%" },
];

const recentMatches: RecentMatch[] = [
  { winner: "CryptoKing", amount: "$500", game: "Coin Toss", timestamp: "2 min ago" },
  { winner: "BlockMaster", amount: "$1,200", game: "Card Draw", timestamp: "5 min ago" },
  { winner: "Web3Pro", amount: "$800", game: "Random Shuffle", timestamp: "10 min ago" },
  { winner: "SolanaWhale", amount: "$650", game: "Coin Toss", timestamp: "15 min ago" },
  { winner: "CoinFlipPro", amount: "$900", game: "Card Draw", timestamp: "20 min ago" },
];

export const Leaderboard = () => {
  return (
    <div className="space-y-4">
      {/* Recent Winners Section */}
      <Card className="bg-dark-purple/50 backdrop-blur-xl border-white/10 p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Award className="text-ocean-blue" />
          Recent Winners
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {recentMatches.map((match, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="text-ocean-blue font-medium">{match.winner}</div>
              <div className="text-white/70 text-sm">Won {match.amount}</div>
              <div className="text-white/50 text-xs">{match.game} • {match.timestamp}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard Section */}
      <div className="w-full bg-dark-purple/50 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={24} className="text-ocean-blue" />
            <span className="text-lg font-semibold text-white">Top Players</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center gap-4 bg-white/5 rounded-lg p-4"
              >
                <span className="text-2xl text-light-purple font-bold">#{entry.rank}</span>
                <div>
                  <p className="text-white font-medium">{entry.username}</p>
                  <p className="text-white/70 text-sm">{entry.points} pts • {entry.winRate} WR</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
