
import { useState } from "react";
import { Plus, Clock, Users, Shuffle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CreateMatchButton = () => {
  const [matchType, setMatchType] = useState("public");
  const [gameType, setGameType] = useState("coinToss");
  const [timeLimit, setTimeLimit] = useState("none");
  const [participants, setParticipants] = useState("2");

  const handleCreateMatch = () => {
    console.log({
      matchType,
      gameType,
      timeLimit,
      participants,
    });
  };

  const handleParticipantsChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 2 && numValue <= 100) {
      setParticipants(value);
    } else if (value === "") {
      setParticipants("");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-gradient-to-r from-light-purple to-ocean-blue hover:opacity-90 transition-opacity text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Match
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-dark-purple/95 backdrop-blur-xl border-white/10">
        <DropdownMenuLabel className="text-white">Match Settings</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <label className="text-xs text-white/70">Match Type</label>
          <DropdownMenuRadioGroup value={matchType} onValueChange={setMatchType}>
            <DropdownMenuRadioItem value="public" className="text-white">Public</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="private" className="text-white">Private</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <label className="text-xs text-white/70">Game Type</label>
          <DropdownMenuRadioGroup value={gameType} onValueChange={setGameType}>
            <DropdownMenuRadioItem value="coinToss" className="text-white">Coin Toss (1v1)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="cardDraw" className="text-white">Card Draw</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="shortStraw" className="text-white">Short Straw</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="randomShuffle" className="text-white">Random Shuffle</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <label className="text-xs text-white/70">Time Limit</label>
          <DropdownMenuRadioGroup value={timeLimit} onValueChange={setTimeLimit}>
            <DropdownMenuRadioItem value="none" className="text-white">No Time Limit</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1min" className="text-white">1 Minute</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="5min" className="text-white">5 Minutes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="10min" className="text-white">10 Minutes</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <label className="text-xs text-white/70">Number of Participants (2-100)</label>
          <Input
            type="number"
            min="2"
            max="100"
            value={participants}
            onChange={(e) => handleParticipantsChange(e.target.value)}
            className="mt-1 bg-white/5 border-white/10 text-white"
          />
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <Button 
            className="w-full bg-gradient-to-r from-light-purple to-ocean-blue hover:opacity-90 transition-opacity"
            onClick={handleCreateMatch}
          >
            Create Match
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
