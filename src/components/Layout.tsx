import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutGrid, 
  MessageSquare, 
  GraduationCap, 
  Users, 
  Newspaper,
  Building2,
  Settings,
  LogOut
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border p-6 flex flex-col">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            WF
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[hsl(210,100%,50%)]">Secretaria</h2>
            <p className="text-xs text-muted-foreground">Sistema de gestão</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-3">visão Geral</p>
          <nav className="space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm">Visão Geral</span>
            </NavLink>
            
            <NavLink 
              to="/todos-chamados" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Todos os chamados</span>
            </NavLink>
            
            <NavLink 
              to="/gerenciar-aluno" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">Gerenciar aluno</span>
            </NavLink>
            
            <NavLink 
              to="/gerenciar-funcionarios" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">Gerenciar funcionários</span>
            </NavLink>
            
            <NavLink 
              to="/jornal" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <Newspaper className="w-4 h-4" />
              <span className="text-sm">Mural</span>
              {window.location.pathname.includes('/jornal') || 
               window.location.pathname.includes('/reclame') || 
               window.location.pathname.includes('/sugestoes') ? (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"></div>
              ) : null}
            </NavLink>
            
            <NavLink 
              to="/setores" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Setores</span>
            </NavLink>
            
            <NavLink 
              to="/configuracoes" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Configurações</span>
            </NavLink>
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="mt-auto mb-6 p-4 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-3">Indicadores Rápidos</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">SLA médio (Dias)</span>
              <span className="font-semibold">1,7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">% resolvidos</span>
              <span className="font-semibold">82%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pendências</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Lucas</h1>
              <p className="text-sm text-muted-foreground">admin@gmail.com</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
