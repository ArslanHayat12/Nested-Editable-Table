import {EditableProps} from "../interfaces/";
import { FormComponentProps } from "antd/lib/form";

export type AppContextType = {
  content?: any;
  dispatch?: any;
};

export type CellType = {
  dataIndex: string;
  rowIndex: number;
} | null;

export type WrappProps = FormComponentProps<any> & EditableProps<any>;