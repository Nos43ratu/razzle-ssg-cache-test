import React, {
  Context,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContext: Context<{ data: any }> = createContext({ data: null });

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { Provider } = DataContext;
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(document.getElementById("DATA")!.textContent!);
    setData(data);
  }, []);

  return <Provider value={data}>{children}</Provider>;
};

export const useData = () => useContext(DataContext);

export default useData;
