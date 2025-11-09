import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Megaphone,
  Lightbulb,
  ImageIcon,
  Paperclip,
  Send,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";

const Sugestoes = () => {
  const [sugestoes, setSugestoes] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);

  const baseUrl = "http://localhost:3000/"; // ✅ URL base para imagens

  // 🔹 Buscar sugestões ao carregar a página
  useEffect(() => {
    const fetchSugestoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/sugestoes/ver-sugestoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar sugestões");
        const data = await res.json();
        setSugestoes(data.reverse()); // mostra as mais novas primeiro
      } catch (err) {
        console.error(err);
      }
    };

    fetchSugestoes();
  }, []);

  // 🔹 Enviar nova sugestão
  const handleEnviar = async () => {
    if (!mensagem.trim()) return alert("Digite uma mensagem antes de enviar.");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("mensagem", mensagem);
    if (arquivo) formData.append("file", arquivo);

    try {
      setCarregando(true);

      const res = await fetch("http://localhost:3000/sugestoes/realizar-sugestao", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao enviar sugestão");
      const nova = await res.json();

      setSugestoes((prev) => [nova, ...prev]); // adiciona no topo
      setMensagem("");
      setArquivo(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar sugestão.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-muted-foreground mb-8">
          Mural da Fatec
        </h2>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <NavLink to="/jornal">
            <Button variant="outline" className="gap-2">
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
            <Button
              variant={
                window.location.pathname === "/sugestoes" ? "default" : "outline"
              }
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Sugestões
            </Button>
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
          {/* Left Column */}
          <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="bg-muted rounded-3xl w-32 h-32 flex items-center justify-center mb-6 overflow-hidden">
                {arquivo ? (
                  <img
                    src={URL.createObjectURL(arquivo)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-3xl"
                  />
                ) : (
                  <ImageIcon
                    className="w-16 h-16 text-muted-foreground"
                    strokeWidth={1}
                  />
                )}
              </div>
              <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                />
                Escolher imagem
              </label>
            </div>

            {/* Input Area */}
            <div className="mt-8 flex gap-4 items-center">
              <div className="flex-1 flex items-center gap-3 px-5 py-3 border border-border rounded-full bg-background">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Escreva a sua sugestão"
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleEnviar}
                  disabled={carregando}
                  className="p-1 hover:bg-accent rounded-full transition-colors"
                >
                  <Send className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sugestões Listadas */}
          <div className="bg-card border border-border rounded-3xl p-8 overflow-y-auto">
            <div className="mb-6">
              <button className="px-6 py-2 border border-border rounded-full text-sm font-medium hover:bg-accent transition-colors">
                Sugestões gerais
              </button>
            </div>

            <div className="space-y-4">
              {sugestoes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma sugestão enviada ainda.
                </p>
              ) : (
                sugestoes.map((sugestao, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-2xl bg-background"
                  >
                    <p className="text-sm text-foreground leading-relaxed mb-3">
                      {sugestao.mensagem}
                    </p>

                    {sugestao.arquivo && (
                      <img
                        src={
                          sugestao.arquivo.startsWith("http")
                            ? sugestao.arquivo
                            : `${baseUrl}${sugestao.arquivo}`
                        }
                        alt="Sugestão"
                        className="rounded-xl w-full max-h-64 object-cover"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sugestoes;
