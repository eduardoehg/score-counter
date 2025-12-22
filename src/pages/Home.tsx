import { useNavigate } from "react-router-dom";
import { Club, Spade, Heart, Diamond } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Score Counter</h1>
        <p className="text-lg text-muted-foreground">Escolha o seu jogo</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Capote Card */}
        <button
          onClick={() => navigate("/capote")}
          className="group relative h-64 bg-card hover:bg-accent/50 border-2 border-border hover:border-primary rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <div className="absolute top-4 left-4 text-primary opacity-20 group-hover:opacity-40 transition-opacity">
            <Club className="w-12 h-12" />
          </div>
          <div className="absolute bottom-4 right-4 text-primary opacity-20 group-hover:opacity-40 transition-opacity">
            <Spade className="w-12 h-12" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Capote</h2>
        </button>

        {/* Truco Card */}
        <button
          onClick={() => navigate("/truco")}
          className="group relative h-64 bg-card hover:bg-accent/50 border-2 border-border hover:border-primary rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <div className="absolute top-4 right-4 text-destructive opacity-20 group-hover:opacity-40 transition-opacity">
            <Heart className="w-12 h-12" />
          </div>
          <div className="absolute bottom-4 left-4 text-destructive opacity-20 group-hover:opacity-40 transition-opacity">
            <Diamond className="w-12 h-12" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Truco</h2>
        </button>
      </div>
    </div>
  );
};

export default Home;
