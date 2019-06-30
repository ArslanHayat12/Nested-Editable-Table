import React from "react";
import { EditableColumn } from "../interfaces/";
import { CellType } from "../types/";
import Cell from "./Cell";
import { hasData } from "./utils";
import { Row, Col, Button,Icon } from "antd";

export default <T extends object>(
  columns: Array<EditableColumn<T>>,
  curCell: CellType,
  setCurCell: any,
  form: any,
  resProps: any
) => {
  const dataIndexMap: string[] = [];
  const loopColumns = (lColumns: Array<EditableColumn<T>>): T[] => {
    return lColumns.map((item: any) => {
      if (item.children) {
        const { children, ...resCol } = item;
        return {
          ...resCol,
          children: loopColumns(children)
        };
      } else {
        const {
          render,
          dataIndex,
          editable = true,
          rules,
          children,
          handleEdit,
          handleSave,
          handleDelete,
          handleCancel,
          isChild,
          ...res
        } = item;
        if (editable) {
          dataIndexMap.push(dataIndex);
        }
        const resItem = {
          dataIndex,
          ...res,
          render: (text: string, record: any, rowIndex: number) => {
            const { editable: rowEditbale = true } = record;
            const initialValue = hasData(
              render ? render(text, record, rowIndex) : text
            );
            if (rowEditbale && editable) {
              const cellprops = {
                form,
                key: `${dataIndex}-${rowIndex}`,
                dataIndex,
                rowIndex,
                curCell,
                onSetCurCell: setCurCell,
                initialValue,
                rules,
                handleEdit,
                handleSave,
                handleDelete,
                handleCancel,
                record,
                resProps
              };
              return <Cell {...cellprops} />;
            }
            return (
              <div>
                {dataIndex === "port" && !resProps.isChild ? (
                  <Row>
                    <Col span={16}>{initialValue}</Col>
                    <Col span={3}>
                      <Button
                        onClick={() => {
                          handleEdit(record.key);
                        }}
                      >
                        <Icon type="edit" />
                      </Button>
                    </Col>
                    <Col span={3}>
                      <Button onClick={() => handleDelete(record.key)}>
                      <Icon type="delete" />
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  initialValue
                )}
              </div>
            );
          }
        };
        return resItem;
      }
    });
  };
  return {
    editColumns: loopColumns(columns),
    dataIndexMap
  };
};
