import React from "react";
import { Row, Col } from "antd";
import Editable from "./Editable";
const ExpandedRowRenderer = ({
  childColumns,
  childData,
  handleAddRow,
  object,
  childCellChange
}: any) => {
  const childDataContent =
    childData && childData.filter((x: any) => x.parentId === object.key);
  return (
    <Row style={{ background: "#ebedf0" }}>
      <Col span={12} />
      <Col span={12} style={{ background: "#FAFAFA" }}>
        <Editable
          showHeader={false}
          isChild={true}
          bordered={false}
          columns={childColumns}
          dataSource={childDataContent}
          pagination={false}
          onCellChange={childCellChange}
          handleAddRow={() => handleAddRow(object.key)}
        />
      </Col>
    </Row>
  );
};

export default ExpandedRowRenderer;
