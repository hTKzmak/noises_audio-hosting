import { createContext } from "react";

type contextData = {
    data: any;
}

export const Context = createContext<contextData>({ data: [] });