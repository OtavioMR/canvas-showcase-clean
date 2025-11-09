import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define o tipo da resposta esperada
interface LoginResponse {
  access_token: string;
  aluno: {
    id: number;
    nomeCompleto: string;
    email: string;
    senha: string;
  };
}

// Componente Login
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para lidar com o login
  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>("http://localhost:3000/auth/aluno/login", {
        email,
        senha,
      });

      // Agora o TypeScript sabe que a resposta contém a propriedade 'access_token'
      if (response.data && response.data.access_token) {
        const token = response.data.access_token;
        localStorage.setItem("token", token); // Armazena o token no localStorage
        console.log("Token armazenado:", token);
        navigate("/jornal"); // Redireciona para a página de Jornal
      } else {
        setErrorMessage("Login ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Entrar</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
