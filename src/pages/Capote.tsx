import { useState } from "react";
import { Plus, RotateCcw, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayerCard } from "@/components/PlayerCard";
import { useNavigate } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  score: number;
}

const Capote = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [nextId, setNextId] = useState(1);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { id: nextId, name: newPlayerName.trim(), score: 0 }]);
      setNextId(nextId + 1);
      setNewPlayerName("");
    }
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const incrementScore = (id: number) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, score: p.score + 1 } : p)));
  };

  const decrementScore = (id: number) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, score: Math.max(0, p.score - 1) } : p)));
  };

  const resetAllScores = () => {
    setPlayers(players.map((p) => ({ ...p, score: 0 })));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-24">
      <header className="flex items-center mb-6 relative">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="absolute left-0">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-foreground">Contador</h1>
          <p className="text-sm text-muted-foreground mt-1">Toque no nome ou + para adicionar pontos</p>
        </div>
      </header>

      {/* Add Player Form */}
      <div className="flex gap-2 mb-6 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Nome do jogador"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 text-base bg-card border-border"
        />
        <Button onClick={addPlayer} size="lg" className="h-12 px-4" disabled={!newPlayerName.trim()}>
          <UserPlus className="w-5 h-5" />
        </Button>
      </div>

      {/* Players Grid */}
      {players.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Adicione jogadores para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              score={player.score}
              onIncrement={() => incrementScore(player.id)}
              onDecrement={() => decrementScore(player.id)}
              onRemove={() => removePlayer(player.id)}
            />
          ))}
        </div>
      )}

      {/* Reset Button - Fixed at bottom */}
      {players.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            variant="secondary"
            size="lg"
            onClick={resetAllScores}
            className="w-full max-w-md mx-auto h-12 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Zerar Tudo
          </Button>
        </div>
      )}
    </div>
  );
};

export default Capote;
