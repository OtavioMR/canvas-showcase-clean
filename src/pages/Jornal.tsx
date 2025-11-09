import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Newspaper, Megaphone, Lightbulb, ImageIcon, Paperclip } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import axios from "axios";

// Tipos de dados para postagens
interface Post {
  id: number;
  titulo: string; // Título
  mensagem: string;
  arquivo: string | null;
  foto: string | null; // Foto (URL ou caminho relativo)
}

const Jornal = () => {
  const [activeTab, setActiveTab] = useState<"destaque" | "recentes">("destaque");
  const [posts, setPosts] = useState<Post[]>([]);
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Para indicar o carregamento

  const location = useLocation(); // Usando o hook useLocation do react-router

  // Função para buscar as postagens da API
  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<Post[]>("http://localhost:3000/jornal-fatec/todas-postagens", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setPosts(response.data); // Define os posts
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Função para enviar uma nova postagem para a API
  const handleCreatePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("mensagem", mensagem);
    if (file) formData.append("files", file); // <-- nome igual ao FilesInterceptor
    if (foto) formData.append("files", foto); // <-- mesmo nome, para ser um array


    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/jornal-fatec/realizar-postagem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Postagem criada:", response.data);
      fetchPosts(); // Recarrega os posts após a criação
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para exibir os posts
  const renderPosts = (posts: Post[]) => {
    return posts.map((post) => (
      <div key={post.id} className="space-y-3">
        <div className="bg-muted rounded-3xl aspect-video flex items-center justify-center">
          {post.foto ? (
            <img
  src={post.foto}
  alt="Imagem do post"
  className="w-full h-full object-cover rounded-3xl"
/>

          ) : (
            <ImageIcon className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
          )}
        </div>
        <h3 className="text-xl font-semibold">{post.titulo}</h3>
        <p className="text-sm text-foreground leading-relaxed">{post.mensagem}</p>
      </div>
    ));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-muted-foreground mb-8">Mural da Fatec</h2>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <NavLink to="/jornal">
            <Button
              variant={location.pathname === "/jornal" ? "default" : "outline"}
              className="gap-2"
            >
              <Newspaper className="w-4 h-4" />
              Jornal
            </Button>
          </NavLink>
          <NavLink to="/melhorias">
            <Button variant="outline" className="gap-2">
              <Megaphone className="w-4 h-4" />
              Melhorias estruturais
            </Button>
          </NavLink>
          <NavLink to="/sugestoes">
            <Button variant="outline" className="gap-2">
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
                className={`text-lg px-4 py-1 rounded-full transition-colors ${activeTab === "destaque" ? "bg-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Destaque
              </button>
            </div>
            <div className="space-y-6">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                renderPosts(posts)
              )}
            </div>

            {/* Create Post Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-6 rounded-full">Criar Postagem</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="space-y-6">
                  <Input
                    placeholder="Título"
                    className="border-border rounded-lg"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  <Textarea
                    placeholder="Descrição"
                    className="min-h-[300px] border-border rounded-lg resize-none"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-dashed border p-6 rounded-xl text-center">
                      <Paperclip className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm">Arraste ou selecione o arquivo</p>
                      <input type="file" className="w-full" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </div>
                    <div className="border-dashed border p-6 rounded-xl text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm">Arraste ou selecione uma foto</p>
                      <input type="file" className="w-full" onChange={(e) => setFoto(e.target.files?.[0] || null)} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={handleCreatePost}>Criar Postagem</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Column - Recent Posts */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("recentes")}
                className={`text-lg px-4 py-1 rounded-full transition-colors ${activeTab === "recentes" ? "bg-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Recentes
              </button>
            </div>
            <div className="space-y-6">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                renderPosts(posts)
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jornal;
