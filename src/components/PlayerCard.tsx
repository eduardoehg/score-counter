import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerCardProps {
  name: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function PlayerCard({ name, score, onIncrement, onDecrement, onRemove }: PlayerCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleIncrement = () => {
    setIsAnimating(true);
    onIncrement();
    setTimeout(() => setIsAnimating(false), 150);
  };

  return (
    <div className="relative bg-card rounded-2xl p-4 border border-border shadow-lg">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        aria-label="Remove player"
      >
        <X className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleIncrement}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg -m-1 p-1"
      >
        <h3 className="text-lg font-semibold text-foreground truncate pr-6">{name}</h3>
        <p className={`text-5xl font-bold text-primary mt-2 tabular-nums ${isAnimating ? 'score-pop' : ''}`}>
          {score}
        </p>
      </button>
      
      <div className="flex gap-2 mt-4">
        <Button
          variant="secondary"
          className="flex-1 h-10"
          onClick={onDecrement}
        >
          <Minus className="w-5 h-5" />
        </Button>
        <Button
          variant="default"
          className="flex-1 h-10"
          onClick={handleIncrement}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
