import { createContext } from "react";
import { AppContextType } from "../types/";
import { dataSource } from "../utils/";
//Reducer updatestate content
export const initialContent = {
  selectedRow: undefined,
  parent: dataSource("parent"),
  child: dataSource("child"),
  expand: false,
  isEdit:false,
  dispatch: () => {}
};
export const AppContext = createContext<AppContextType>(initialContent);
