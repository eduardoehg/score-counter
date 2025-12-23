import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Truco = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scoreNos, setScoreNos] = useState(0);
  const [scoreEles, setScoreEles] = useState(0);
  const [history, setHistory] = useState<{ nos: number; eles: number }[]>([]);

  // Function to add points safely
  const addPoints = (team: "NOS" | "ELES", points: number) => {
    // Check if game is already over
    if (scoreNos >= 12 || scoreEles >= 12) return;

    // Save history for undo (optional, simple logic here just tracks score)
    // For now, we will just update state directly

    if (team === "NOS") {
      const newScore = Math.min(12, scoreNos + points);
      setScoreNos(newScore);
      checkVictory(newScore, "Nós");
    } else {
      const newScore = Math.min(12, scoreEles + points);
      setScoreEles(newScore);
      checkVictory(newScore, "Eles");
    }
  };

  const removePoint = (team: "NOS" | "ELES") => {
    if (team === "NOS") {
      setScoreNos(Math.max(0, scoreNos - 1));
    } else {
      setScoreEles(Math.max(0, scoreEles - 1));
    }
  };

  const checkVictory = (score: number, teamName: string) => {
    if (score >= 12) {
      toast({
        title: "Fim de jogo! 🏆",
        description: `A equipe ${teamName} venceu a partida!`,
        duration: 5000,
      });
    }
  };

  const resetGame = () => {
    setScoreNos(0);
    setScoreEles(0);
  };

  const isWinnerNos = scoreNos >= 12;
  const isWinnerEles = scoreEles >= 12;

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Floating Back Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate("/")} 
        className="absolute top-4 left-4 z-10 hover:bg-accent/50 text-muted-foreground"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-row divide-x divide-border">
        
        {/* NÓS Column */}
        <div className={`flex-1 flex flex-col items-center justify-center p-2 md:p-6 relative transition-colors duration-500 ${isWinnerNos ? "bg-primary/10" : "bg-background"}`}>
          {isWinnerNos && <Trophy className="absolute top-8 text-primary w-8 h-8 md:w-12 md:h-12 animate-bounce" />}
          <h2 className="text-2xl md:text-4xl font-black text-primary mb-4 md:mb-8 tracking-wider">NÓS</h2>
          
          <div className="text-6xl md:text-[10rem] font-bold leading-none mb-6 md:mb-12 tabular-nums text-foreground">
            {scoreNos}
          </div>

          <div className="flex gap-2 md:gap-4 w-full max-w-xs px-2">
            <Button 
              onClick={() => addPoints("NOS", 1)} 
              className="flex-1 h-12 md:h-20 text-lg md:text-2xl font-bold bg-primary hover:bg-primary/90"
              disabled={isWinnerNos || isWinnerEles}
            >
              +1
            </Button>
            <Button 
              onClick={() => addPoints("NOS", 3)} 
              className="flex-1 h-12 md:h-20 text-lg md:text-2xl font-bold bg-primary hover:bg-primary/90"
              disabled={isWinnerNos || isWinnerEles}
            >
              +3
            </Button>
          </div>
          <div className="mt-4">
             <Button variant="ghost" size="sm" onClick={() => removePoint("NOS")} disabled={scoreNos === 0 || isWinnerNos || isWinnerEles}>
                <Minus className="w-4 h-4 mr-1" /> Ajustar (-1)
             </Button>
          </div>
        </div>

        {/* ELES Column */}
        <div className={`flex-1 flex flex-col items-center justify-center p-2 md:p-6 relative transition-colors duration-500 ${isWinnerEles ? "bg-destructive/10" : "bg-background"}`}>
          {isWinnerEles && <Trophy className="absolute top-8 text-destructive w-8 h-8 md:w-12 md:h-12 animate-bounce" />}
          <h2 className="text-2xl md:text-4xl font-black text-destructive mb-4 md:mb-8 tracking-wider">ELES</h2>
          
          <div className="text-6xl md:text-[10rem] font-bold leading-none mb-6 md:mb-12 tabular-nums text-foreground">
            {scoreEles}
          </div>

          <div className="flex gap-2 md:gap-4 w-full max-w-xs px-2">
            <Button 
              onClick={() => addPoints("ELES", 1)} 
              className="flex-1 h-12 md:h-20 text-lg md:text-2xl font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm"
              disabled={isWinnerNos || isWinnerEles}
            >
              +1
            </Button>
            <Button 
              onClick={() => addPoints("ELES", 3)} 
              className="flex-1 h-12 md:h-20 text-lg md:text-2xl font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm"
              disabled={isWinnerNos || isWinnerEles}
            >
              +3
            </Button>
          </div>
          <div className="mt-4">
             <Button variant="ghost" size="sm" onClick={() => removePoint("ELES")} disabled={scoreEles === 0 || isWinnerNos || isWinnerEles}>
                <Minus className="w-4 h-4 mr-1" /> Ajustar (-1)
             </Button>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-background border-t border-border">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={resetGame}
          className="w-full max-w-md mx-auto flex items-center gap-2 h-14 text-lg border-2 hover:bg-accent"
        >
          <RotateCcw className="w-5 h-5" />
          Zerar Partida
        </Button>
      </div>
    </div>
  );
};

export default Truco;
