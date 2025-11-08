import { Button } from "@/components/ui/button";
import { Newspaper, Megaphone, Lightbulb, ImageIcon, Paperclip, Send } from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";

const Reclame = () => {
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
              variant={window.location.pathname === "/reclame" ? "default" : "outline"}
              className="gap-2"
            >
              <Megaphone className="w-4 h-4" />
              Reclame aqui
            </Button>
          </NavLink>
          <NavLink to="/sugestoes">
            <Button 
              variant="outline"
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Sugestões
            </Button>
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="bg-card border border-border rounded-3xl p-8 min-h-[500px] flex flex-col">
          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-muted rounded-3xl w-32 h-32 flex items-center justify-center mb-6">
              <ImageIcon className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
            </div>
            <button className="px-6 py-2 border border-border rounded-full text-muted-foreground hover:bg-accent transition-colors">
              Reclamações
            </button>
          </div>

          {/* Input Area */}
          <div className="mt-8 flex gap-4 items-center">
            <div className="flex-1 flex items-center gap-3 px-5 py-3 border border-border rounded-full bg-background">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Escreva a sua situação"
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              />
              <button className="p-1 hover:bg-accent rounded-full transition-colors">
                <Send className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <Button className="px-8 rounded-full">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reclame;
