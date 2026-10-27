import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type Usuario = { nome: string; email: string };

type AppContextType = {
  usuario: Usuario | null;
  entrar: (email: string) => void;
  sair: () => void;
  favoritos: string[];
  isFavorito: (id: string) => boolean;
  toggleFavorito: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const entrar = useCallback((email: string) => {
    setUsuario({ nome: email.split('@')[0], email });
  }, []);

  const sair = useCallback(() => setUsuario(null), []);

  const toggleFavorito = useCallback((id: string) => {
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]
    );
  }, []);

  const isFavorito = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos]
  );

  const value = useMemo(
    () => ({ usuario, entrar, sair, favoritos, isFavorito, toggleFavorito }),
    [usuario, entrar, sair, favoritos, isFavorito, toggleFavorito]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return ctx;
}
