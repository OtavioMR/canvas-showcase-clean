import { Button } from "@/components/ui/button";
import { Newspaper, Megaphone, Lightbulb, ImageIcon, Paperclip, Send } from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";

const Sugestoes = () => {
  const suggestions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada mauris Mauris sed odio lectus. Donec ligula lorem.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada mauris Mauris sed odio lectus. Donec ligula lorem.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed odio lectus. Donec ligula lorem.",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-muted-foreground mb-8">Mural da Fatec</h2>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <NavLink to="/jornal">
            <Button 
              variant="outline"
              className="gap-2"
            >
              <Newspaper className="w-4 h-4" />
              Jornal
            </Button>
          </NavLink>
          <NavLink to="/reclame">
            <Button 
              variant="outline"
              className="gap-2"
            >
              <Megaphone className="w-4 h-4" />
              Reclame aqui
            </Button>
          </NavLink>
          <NavLink to="/sugestoes">
            <Button 
              variant={window.location.pathname === "/sugestoes" ? "default" : "outline"}
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Sugestões
            </Button>
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-card border border-border rounded-3xl p-8 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="bg-muted rounded-3xl w-32 h-32 flex items-center justify-center mb-6">
                <ImageIcon className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-8 flex gap-4 items-center">
              <div className="flex-1 flex items-center gap-3 px-5 py-3 border border-border rounded-full bg-background">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Escreva a sua sugestão"
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
                <button className="p-1 hover:bg-accent rounded-full transition-colors">
                  <Send className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Suggestions List */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="mb-6">
              <button className="px-6 py-2 border border-border rounded-full text-sm font-medium hover:bg-accent transition-colors">
                Sugestões gerais
              </button>
            </div>

            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border border-border rounded-2xl bg-background">
                  <p className="text-sm text-foreground leading-relaxed">{suggestion}</p>
                </div>
              ))}

              {/* Featured Suggestion with Image */}
              <div className="p-4 border border-border rounded-2xl bg-background">
                <div className="flex gap-4">
                  <div className="bg-muted rounded-2xl w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" strokeWidth={1} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed odio lectus. Donec ligula lorem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-2xl bg-background">
                <p className="text-sm text-foreground leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed odio lectus. Donec ligula lorem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sugestoes;
