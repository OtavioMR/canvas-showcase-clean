import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Newspaper, Megaphone, Lightbulb, ImageIcon, Paperclip } from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";

const Jornal = () => {
  const [activeTab, setActiveTab] = useState<"destaque" | "recentes">("destaque");

  const posts = [
    { id: 1, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
    { id: 2, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
  ];

  const recentPosts = [
    { id: 1, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
    { id: 2, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
    { id: 3, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
    { id: 4, image: "/placeholder.svg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-muted-foreground mb-8">Mural da Fatec</h2>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <NavLink to="/jornal">
            <Button 
              variant={window.location.pathname === "/jornal" ? "default" : "outline"}
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
              variant="outline"
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Sugestões
            </Button>
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Featured Posts */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("destaque")}
                className={`text-lg px-4 py-1 rounded-full transition-colors ${
                  activeTab === "destaque" 
                    ? "bg-accent font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Destaque
              </button>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="space-y-3">
                  <div className="bg-muted rounded-3xl aspect-video flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{post.text}</p>
                </div>
              ))}
            </div>

            {/* Create Post Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-6 rounded-full">
                  Criar Postagem
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="space-y-6">
                  <Input 
                    placeholder="Título"
                    className="border-border rounded-lg"
                  />
                  
                  <Textarea 
                    placeholder="Descrição"
                    className="min-h-[300px] border-border rounded-lg resize-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-border rounded-3xl aspect-video flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
                      <span className="text-sm text-muted-foreground">Imagem</span>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-3xl aspect-video flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors cursor-pointer">
                      <Paperclip className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
                      <span className="text-sm text-muted-foreground">Arquivo</span>
                    </div>
                  </div>

                  <Button className="w-full rounded-full">
                    Enviar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Column - Recent Posts */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("recentes")}
                className="text-lg px-4 py-1 rounded-full bg-accent font-medium"
              >
                Recentes
              </button>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex gap-4 items-start">
                  <div className="bg-muted rounded-2xl w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" strokeWidth={1} />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-2">{post.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jornal;
