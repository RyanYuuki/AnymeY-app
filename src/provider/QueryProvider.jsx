import { createContext, useContext, useState } from "react";

const QueryContext = createContext();

export function useQuery() {
    return useContext(QueryContext);
}
export function QueryProvider({ children }) {
    const [ isSearchSelected, setSearchSelected ] = useState(false);
    const [isQualityMenuEnvoked, setQualityMenuEnvoked] = useState(false);
    return (
        <QueryContext.Provider value={{ isSearchSelected, setSearchSelected, isQualityMenuEnvoked, setQualityMenuEnvoked}}>
            {children}
        </QueryContext.Provider>
    );
}