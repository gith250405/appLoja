import React, {createContext,useCallback,useContext,useMemo,useState,} from 'react';

type Usuario = { nome: string; email: string };

type AppContextType = {
  usuario: Usuario | null;
  entrar: (email: string) => void;
  sair: () => void;
  favoritos: string[];
  isFavorito: (id: string) => boolean;
  toggleFavorito: (id: string) => void;
};

const JVFAppContext = createContext<AppContextType | undefined>(undefined);

export function JVFAppProvider({ children: JVFchildren }: { children: React.ReactNode }) {
  const [JVFusuario, JVFsetUsuario] = useState<Usuario | null>(null);
  const [JVFfavoritos, JVFsetFavoritos] = useState<string[]>([]);

  const JVFentrar = useCallback((JVFemail: string) => {
    JVFsetUsuario({ nome: JVFemail.split('@')[0], email: JVFemail });
  }, []);

  const JVFsair = useCallback(() => JVFsetUsuario(null), []);

  const JVFtoggleFavorito = useCallback((JVFid: string) => {
    JVFsetFavoritos((JVFatual) =>
      JVFatual.includes(JVFid)
        ? JVFatual.filter((JVFf) => JVFf !== JVFid)
        : [...JVFatual, JVFid]
    );
  }, []);

  const JVFisFavorito = useCallback(
    (JVFid: string) => JVFfavoritos.includes(JVFid),
    [JVFfavoritos]
  );

  const JVFvalue = useMemo(
    () => ({
      usuario: JVFusuario,
      entrar: JVFentrar,
      sair: JVFsair,
      favoritos: JVFfavoritos,
      isFavorito: JVFisFavorito,
      toggleFavorito: JVFtoggleFavorito,
    }),
    [JVFusuario, JVFentrar, JVFsair, JVFfavoritos, JVFisFavorito, JVFtoggleFavorito]
  );

  return <JVFAppContext.Provider value={JVFvalue}>{JVFchildren}</JVFAppContext.Provider>;
}

export function useJVFApp() {
  const JVFctx = useContext(JVFAppContext);
  if (!JVFctx) throw new Error('useJVFApp deve ser usado dentro de <JVFAppProvider>');
  return JVFctx;
}
