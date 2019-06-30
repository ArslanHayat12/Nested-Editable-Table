import {CellType} from "../types/";
import { ValidationRule } from "antd/lib/form";
import { ButtonProps } from "antd/lib/button";
import { TableProps, ColumnProps } from "antd/lib/table";

export interface CellProps {
  form: any;
  dataIndex: string;
  rowIndex: number;
  curCell: CellType;
  onSetCurCell: (curCell: CellType) => void;
  initialValue: any;
  rules: ValidationRule[];
  handleEdit?: any;
  handleDelete?: any;
  handleSave?: any;
  handleCancel?:any,
  record?:any;
  resProps?: any;
}

export interface EditableColumn<T> extends ColumnProps<T> {
  editable?: boolean;
  rule?: ValidationRule[];
  handleEdit?:() => void;
  handleSave?:() => void;
  handleDelete?:() => void;
  handleCancel?:()=> void;
  isChild?: boolean;

}

export interface EditableProps<T> extends TableProps<T> {
  columns?: Array<EditableColumn<T>>;
  onCellChange?: (nextSource: T[]) => void;
  onSubmit?: (nextSource: T[]) => void;
  btnProps?: { text?: string } & ButtonProps;
  isChild?: boolean;
  handleAddRow?:any
}

