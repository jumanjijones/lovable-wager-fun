
import { useState } from "react";
import { Plus } from "lucide-react";
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
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PoolType = 'pocket_change' | 'ballers' | 'high_limit_vip';

const poolTypes: Record<PoolType, { label: string; min: number; max: number }> = {
  pocket_change: {
    label: "Pocket Change",
    min: 1,
    max: 100,
  },
  ballers: {
    label: "Ballers",
    min: 101,
    max: 10000,
  },
  high_limit_vip: {
    label: "High Limit VIP",
    min: 10001,
    max: Infinity,
  },
};

export const CreateMatchButton = () => {
  const { connected, publicKey } = useWallet();
  const { toast } = useToast();
  const [matchType, setMatchType] = useState("public");
  const [poolType, setPoolType] = useState<PoolType>("pocket_change");
  const [anteAmount, setAnteAmount] = useState("");
  const [timeLimit, setTimeLimit] = useState("none");
  const [participants, setParticipants] = useState("2");

  const handleAnteAmountChange = (value: string) => {
    // Allow empty string or valid numbers
    if (value === "" || !isNaN(Number(value))) {
      setAnteAmount(value);
    }
  };

  const validateAnteAmount = () => {
    const amount = Number(anteAmount);
    const selectedPool = poolTypes[poolType];
    
    if (isNaN(amount) || amount < selectedPool.min) {
      toast({
        variant: "destructive",
        title: "Invalid ante amount",
        description: `Minimum ante for ${selectedPool.label} is ${selectedPool.min} SOL`,
      });
      return false;
    }
    
    if (amount > selectedPool.max) {
      toast({
        variant: "destructive",
        title: "Invalid ante amount",
        description: `Maximum ante for ${selectedPool.label} is ${selectedPool.max} SOL`,
      });
      return false;
    }
    
    return true;
  };

  const handleCreateMatch = async () => {
    if (!connected || !publicKey) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet to create a match",
      });
      return;
    }

    if (!validateAnteAmount()) {
      return;
    }

    try {
      const { error } = await supabase
        .from("pools")
        .insert([{
          creator_id: publicKey.toString(),
          pool_type: poolType,
          ante_amount: Number(anteAmount),
          status: 'active'
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pool created successfully!",
      });

      // Reset form
      setAnteAmount("");
    } catch (error) {
      console.error('Error creating pool:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create pool. Please try again.",
      });
    }
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
        <Button className="bg-gradient-to-r from-light-purple to-ocean-blue hover:opacity-90 transition-opacity text-white">
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
          <label className="text-xs text-white/70">Pool Type</label>
          <DropdownMenuRadioGroup value={poolType} onValueChange={setPoolType as (value: string) => void}>
            <DropdownMenuRadioItem value="pocket_change" className="text-white">
              Pocket Change (1-100 SOL)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ballers" className="text-white">
              Ballers (101-10,000 SOL)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="high_limit_vip" className="text-white">
              High Limit VIP (10,001+ SOL)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        
        <div className="p-2">
          <label className="text-xs text-white/70">Ante Amount (SOL)</label>
          <Input
            type="number"
            value={anteAmount}
            onChange={(e) => handleAnteAmountChange(e.target.value)}
            placeholder={`Min ${poolTypes[poolType].min} SOL`}
            className="mt-1 bg-white/5 border-white/10 text-white"
          />
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
