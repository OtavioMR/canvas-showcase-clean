import { useState, useEffect } from "react";  // Corrigido: importando useEffect
import { Button } from "@/components/ui/button";
import { Newspaper, Megaphone, Lightbulb, ImageIcon, Paperclip, UserX } from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";
import axios from "axios";

const Reclame = () => {
  const [situation, setSituation] = useState("");  // Estado para a situação da reclamação
  const [loading, setLoading] = useState(false);   // Estado de loading para a requisição
  const [file, setFile] = useState<File | null>(null);  // Estado para o arquivo anexado
  const [reclamacoes, setReclamacoes] = useState<any[]>([]);  // Para mostrar as reclamações feitas

  // Função para enviar a reclamação
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    if (!situation.trim()) {
      console.error("A situação não pode estar vazia!");
      return;
    }

    setLoading(true);  // Inicia o estado de loading

    const formData = new FormData();
    formData.append("mensagem", situation);        // Envia a mensagem

    // Adiciona o arquivo, se existir
    if (file) {
      formData.append("arquivo", file);
    }

    try {
      // Enviar dados para o backend
      const response = await axios.post(
        "http://localhost:3000/reclame-aqui/criar-reclamacao",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token para autenticação
            "Content-Type": "multipart/form-data",  // Necessário para enviar arquivos
          }
        }
      );

      console.log("Reclamação enviada:", response.data);

      // Resetar o estado após o envio
      setSituation("");
      setFile(null);  // Limpa o arquivo após o envio

      // Resetando o estado de loading
      setLoading(false);

      // Buscar as reclamações novamente após enviar
      fetchReclamacoes();
    } catch (error) {
      console.error("Erro ao enviar reclamação:", error.response || error.message);
      setLoading(false);
    }
  };

  // Função para buscar as reclamações feitas pelo usuário
  const fetchReclamacoes = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    try {
      const response = await axios.get<any[]>("http://localhost:3000/reclame-aqui/ver-reclamacoes", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setReclamacoes(response.data);  // Atualiza o estado com as reclamações
    } catch (error) {
      console.error("Erro ao buscar reclamações:", error.response || error.message);
    }
  };

  // Chama a função de buscar as reclamações quando o componente for montado
  useEffect(() => {
    fetchReclamacoes();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-muted-foreground mb-8">Mural da Fatec</h2>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <NavLink to="/jornal">
            <Button variant="outline" className="gap-2">
              <Newspaper className="w-4 h-4" />
              Jornal
            </Button>
          </NavLink>
          <NavLink to="/melhorias">
            <Button variant={window.location.pathname === "/reclame" ? "default" : "outline"} className="gap-2">
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
        <div className="bg-card border border-border rounded-3xl p-8 min-h-[500px] flex flex-col">
          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-muted rounded-3xl w-32 h-32 flex items-center justify-center mb-6">
              <ImageIcon className="w-16 h-16 text-muted-foreground" strokeWidth={1} />
            </div>
            <button className="px-6 py-2 border border-border rounded-full text-muted-foreground hover:bg-accent transition-colors">
              Melhorias estruturais
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
                value={situation}
                onChange={(e) => setSituation(e.target.value)} // Atualiza o estado
              />
            </div>

            {/* File Input */}
            <div className="flex flex-col">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} // Atualiza o arquivo
                className="px-4 py-2 border rounded-xl"
              />
            </div>

            <Button className="px-8 rounded-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>

        {/* List of Previous Reclamations */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Meus envios</h3>
          <div className="space-y-4">
            {reclamacoes.length > 0 ? (
              reclamacoes.map((reclamacao) => (
                <div key={reclamacao.id} className="p-4 border rounded-xl bg-muted">
                  <p><strong>Mensagem:</strong> {reclamacao.mensagem}</p>
                  {/* Se houver um arquivo anexado */}
                  {reclamacao.arquivo && (
                    <a href={`http://localhost:3000/uploads/${reclamacao.arquivo}`} target="_blank" rel="noopener noreferrer">
                      <button className="mt-2 text-sm text-blue-600">Baixar Arquivo</button>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">Você ainda não fez nenhuma reclamação.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reclame;
