
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  winRate: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoKing", points: 2500, winRate: "75%" },
  { rank: 2, username: "BlockMaster", points: 2200, winRate: "70%" },
  { rank: 3, username: "Web3Pro", points: 2000, winRate: "68%" },
];

export const Leaderboard = () => {
  return (
    <div className="w-full bg-dark-purple/50 backdrop-blur-xl border-b border-white/10 py-2">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 text-ocean-blue">
            <Trophy size={20} />
            <span className="text-sm font-semibold whitespace-nowrap">Top Players:</span>
          </div>
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-3 border-l border-white/10 pl-3"
            >
              <span className="text-light-purple font-bold">#{entry.rank}</span>
              <div className="text-sm">
                <p className="text-white font-medium">{entry.username}</p>
                <p className="text-white/70 text-xs">{entry.points} pts • {entry.winRate} WR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
