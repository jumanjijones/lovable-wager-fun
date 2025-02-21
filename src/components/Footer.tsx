
import { Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-dark-purple/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
              </a>
            </Button>
          </div>
          <Button variant="link" asChild>
            <a href="/faq">FAQ</a>
          </Button>
        </div>
      </div>
    </footer>
  );
};
