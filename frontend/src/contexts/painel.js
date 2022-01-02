import {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react';

const PainelContext = createContext({});

export function usePainel () {
  return useContext(PainelContext);
}

export default function PainelProvider ({ children }) {
  const [painel, setPainel] = useState(() => {
    const painel = localStorage.getItem("@App:Painel");
    return painel
  });
  
  const setPainelData = useCallback((data) => {
    localStorage.setItem("@App:Painel", data);
    setPainel(data);
  }, []);

  return (
    <PainelContext.Provider value={{ painel, setPainelData }}>
      { children }
    </PainelContext.Provider>
  );
}
