import React from "react";
import { Row, Col } from "antd";
import ExampleData from "./Editable";
const ExpandedRowRenderer = ({childColumns,childData,handleAddRow,object,childCellChange}:any) => {
  return (
    <Row style={{background:"#ebedf0"}}>
      <Col span={12} ></Col>
      <Col span={12} style={{background:"#FAFAFA"}}>
        <ExampleData
          showHeader={false}
          isChild={true}
          bordered={false}
          columns={childColumns}
          dataSource={childData}
          pagination={false}
          onCellChange={childCellChange}
          handleAddRow={()=>handleAddRow(object.key)}
        />
      </Col>
    </Row>
  );
};

export default ExpandedRowRenderer;
