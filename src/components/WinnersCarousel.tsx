
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Trophy } from "lucide-react";

const mockWinners = [
  { username: "CryptoKing", amount: "$500" },
  { username: "BlockMaster", amount: "$1,200" },
  { username: "Web3Pro", amount: "$800" },
  { username: "SolanaWhale", amount: "$650" },
];

export const WinnersCarousel = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {mockWinners.map((winner, index) => (
            <CarouselItem key={index} className="md:basis-1/4">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-lg p-2">
                <Trophy className="w-4 h-4 text-ocean-blue" />
                <div className="text-sm">
                  <span className="text-white font-medium">{winner.username}</span>
                  <span className="text-white/70 ml-2">{winner.amount}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};
