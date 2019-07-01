import React, { FC, Fragment } from "react";
import { Input, Form, Select, InputNumber, Button, Row, Col,Icon } from "antd";
import { CellProps } from "../interfaces/index";

const Item = Form.Item;
const { Option } = Select;
const EditableCell: FC<CellProps> = ({
  form,
  dataIndex,
  rowIndex,
  curCell,
  onSetCurCell,
  initialValue,
  rules = [],
  handleSave,
  handleDelete,
  handleCancel,
  record,
  resProps
}) => {
  const isEditing: boolean = true;
  
  const handleSetCurCell = () => {
    onSetCurCell({
      dataIndex,
      rowIndex
    });
  };

  const getInput = () => {
    if (dataIndex === "protocol") {
      return (
        <Select
          style={{ width: "32%" }}
          onBlur={handleSaveData}
          onChange={handleSetCurCell}
        >
          <Option value="HTTP">HTTP</Option>
          <Option value="HTTPS">HTTPS</Option>
          <Option value="TCP">TCP</Option>
          <Option value="UDP">UDP</Option>
        </Select>
      );
    } else {
      return (
        <Input
          onBlur={handleSaveData}
          onPressEnter={handleSaveData}
          onChange={handleSetCurCell}
        />
      );
    }
  };

  const handleSaveData = () => {
    form.validateFields(
      [`${dataIndex}-${rowIndex}`],
      (err: object, data: any) => {
        if (!err) {
          onSetCurCell(null);
        }
      }
    );
  };

  const handleSubmit=(key:string)=>{
    onSetCurCell({
      dataIndex,
      rowIndex
    });
    form.validateFields(
      [`${dataIndex}-${rowIndex}`,`protocol-${rowIndex}`,`ip-${rowIndex}`,`port-${rowIndex}`],
      (err: object) => {
        if (!err) {
          onSetCurCell(null);
          handleSave(key);
        }
      }
    );
  }
  const cellContent = (
    <div className="editable-cell-value-wrap">{initialValue}</div>
  );

  return (
    <div style={{ textAlign: "left" }}>
       
      {dataIndex === "port" ? (
        <Row>
          <Col span={16}>
            <Item>
              {form.getFieldDecorator(`${dataIndex}-${rowIndex}`, {
                initialValue,
                rules
              })(
                isEditing ? (
                  <InputNumber
                    onClick={() => handleSetCurCell()}
                    onBlur={() => {
                      handleSaveData();
                    }}
                  />
                ) : (
                  cellContent
                )
              )}
            </Item>
          </Col>

          {resProps.isChild ? (
            <Col span={4}>
              <Button onClick={() => handleDelete(record.key)}><Icon type="delete" /></Button>
            </Col>
          ) : (
            <Fragment>
              <Col span={4}>
                <Button onClick={() => handleSubmit(record.key)}><Icon type="check" /></Button>
               
              </Col>
              <Col span={4}>
                <Button onClick={() => handleCancel(record.key)}><Icon type="close" /></Button>
              </Col>
            </Fragment>
          )}
        </Row>
      ) : (
        <Item>
          {form.getFieldDecorator(`${dataIndex}-${rowIndex}`, {
            initialValue: initialValue === "--" ? "" : initialValue,
            rules
          })(isEditing ? getInput() : cellContent)}
        </Item>
      )}
    </div>
  );
};
export default EditableCell;
