import {
  UPDATE_DATA,
  RESET
} from "../constants/";
import { dataSource } from "../utils/";
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        selectedRow: action.selectedRow||state.selectedRow,
        parent: action.parent || state.parent,
        child: action.child || state.child,
        isEdit:(typeof action.isEdit === "boolean")?action.isEdit: state.isEdit,
      }
    case RESET:
      return {
        selectedRow: undefined,
        parent: dataSource("parent"),
        child: dataSource("child"),
        expand: false,
        isEdit:false
      };
    default:
      return {
        selectedRow: undefined,
        parent: dataSource("parent"),
        child: dataSource("child"),
        expand: false,
        isEdit:false
      };
  }
};
