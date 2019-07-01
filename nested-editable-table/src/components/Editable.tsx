import React, { FC, useState, useEffect, useContext } from "react";
import { Table, Form, Button } from "antd";
import useProps from "./useProps";
import EditableWrapper from "./style/EditableWrapper";
import { WrappProps } from "../types/";
import { AppContext } from "../context/";

const Editable: FC<WrappProps> = ({
  dataSource = [],
  columns = [],
  form,
  onCellChange = ()=>{},
  onSubmit,
  ...resProps
}) => {
  const { dispatch, content } = useContext(AppContext);
  const { cacheSource, editColumns } = useProps(
    dataSource,
    columns,
    onCellChange,
    form,
    resProps
  );
  const [state, setState] = useState(cacheSource);
  
  useEffect(() => {
    setState(cacheSource);
  }, [cacheSource]);
  
  return (
    <EditableWrapper>
      <Table
        className="editable"
        dataSource={state}
        columns={editColumns}
        // rowClassName={() => "editable-row"}
        expandedRowKeys={[content.selectedRow && content.selectedRow.key]}
        onExpand={(expand: any, record: any) => {
          const key = expand || (!expand && content.isEdit ) ? record.key: ''
          dispatch({ type: "UPDATE_DATA", selectedRow: { key } })
        }}
        {...resProps}
        pagination={false}
      />

      {resProps.isChild && content.isEdit && content.selectedRow.key ? (
        <Button onClick={() => resProps.handleAddRow()}>Add</Button>
      ) : null}
    </EditableWrapper>
  );
};

export default Form.create<any>()(Editable);
