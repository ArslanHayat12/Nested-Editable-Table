import { useState, useEffect, useMemo, useRef } from "react";
import computedEditColumns from "./ColumnsRenderer";
import { CellType } from "../types/";
import { EditableColumn } from "../interfaces/";


const useProps = <T extends object>(
  dataSource: T[],
  columns: Array<EditableColumn<T>>,
  onCellChange: (nextSource: T[]) => void,
  form: any,
  resProps: any,
) => {
  //The currently active cell, the default is null
  const [curCell, setCurCell] = useState<CellType>(null);

  // Internally maintained dataSource
  const { cacheSource, setCacheSource } = useDataSource(dataSource, form);

  // Record each updated cell with ref
  const beforeCell = useRef<CellType>(null);

  // Use useMemo to cache editColumns and dataIndexMap. Updated only after changes to columns and curCell
  const { editColumns } = useMemo(
    () => computedEditColumns(columns, curCell, handleSetCurCell, form,resProps),
    [columns, curCell]
  );


  // Change the cached dataSource whenever the curCell changes. And execute onCellChange
  useEffect(() => {
    if (beforeCell && beforeCell.current) {
      const { dataIndex, rowIndex } = beforeCell.current;
      const value = form.getFieldValue(`${dataIndex}-${rowIndex}`);
      const nextSource = [...cacheSource];
      console.log(nextSource,cacheSource,curCell)
      nextSource[rowIndex][dataIndex] = value;
      setCacheSource(nextSource);
      onCellChange(nextSource);
    }

    // Reset the value of the Ref record
    beforeCell.current = curCell;
  }, [curCell]);

  function handleSetCurCell(nextCell: CellType) {
    // If the current cell has an error, it is forbidden to switch.
    if (
      !curCell ||
      !form.getFieldError(`${curCell!.dataIndex}-${curCell!.rowIndex}`)
    ) {
      setCurCell(nextCell);
    }
  }

  return {
    cacheSource,
    editColumns
  };
};

const useDataSource = (dataSource: any[], form: any) => {
  const [cacheSource, setCacheSource] = useState(dataSource);

  // External dataSource updates the value of the dataSource and form fields of the synchronous update cache
  useEffect(() => {
    setCacheSource(dataSource);
    //form.resetFields();
  }, [dataSource]);

  return {
    cacheSource,
    setCacheSource
  };
};

export default useProps;
