import React, { FC, useState, useEffect, useContext } from "react";
import { Table, Form, Button } from "antd";
import useProps from "./useProps";
import EditableWrapper from "./style/EditableWrapper";
import { WrappProps } from "../types/";
import { AppContext } from "../context/";
function noop() {}

const btnDefaultProps = { text: "Add", style: { marginTop: 10 } };

const Editable: FC<WrappProps> = ({
  dataSource = [],
  columns = [],
  form,
  btnProps = btnDefaultProps,
  onCellChange = noop,
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

  // const { text: btnText, ...restBtnProps } = btnProps;

  // function handleSubmit() {
  //   if (onSubmit) onSubmit(cacheSource);
  // }
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
        rowClassName={() => "editable-row"}
        expandedRowKeys={[content.selectedRow && content.selectedRow.key]}
        onExpand={(expand: any, record: any) => {
          if (expand)
            dispatch({ type: "UPDATE_DATA", selectedRow: { key: record.key } });
          else dispatch({ type: "UPDATE_DATA", selectedRow: { key: "" } });
        }}
        {...resProps}
        pagination={false}
      />
      {console.log(content)}
      {resProps.isChild && content.isEdit && content.selectedRow.key ? (
        <Button onClick={() => resProps.handleAddRow()}>Add</Button>
      ) : null}
    </EditableWrapper>
  );
};

export default Form.create<any>()(Editable);
