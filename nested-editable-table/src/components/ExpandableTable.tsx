import React, { useContext, Fragment } from "react";
import Editable from "./Editable";
import ExpandedRowRenderer from "./ExpandedRowRenderer";
import { Button } from "antd";
import {
  createNewChildObject,
  createNewParentObject,
  getRules,
  updateData,
  storeData,
  removeData,
  removeChildData
} from "../utils";
import "../styles/index.css";
import { AppContext } from "../context";

const ExpandableTable = () => {
  const { content, dispatch } = useContext(AppContext);
  
  const handleCellChange = (parent: any) => {
    dispatch({
      type: "UPDATE_DATA",
      parent
    });
  };

  const childCellChange = (child: any) => {
    dispatch({
      type: "UPDATE_DATA",
      child
    });
  };
  const handleAddRow = (parentId: string) => {
    dispatch({
      type: "UPDATE_DATA",
      child: createNewChildObject(parentId)
    });
  };
  const addRow = () => {
    dispatch({
      type: "UPDATE_DATA",
      parent: createNewParentObject()
    });
  };
  const columns = [
    {
      title: "Rule Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      rules: getRules("parent", "Please enter rule name!",content)
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
      width: "25%",
      rules: getRules("parent", "Please enter IP address!",content)
    },
    {
      title: "Protocol",
      dataIndex: "protocol",
      key: "protocol",
      width: "25%",
      rules: getRules("parent", "Please select protocol!",content)
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      width: "25%",
      rules: getRules("parent", "Please enter port number!",content),
      handleEdit: (key: any) => {
        dispatch({
          type: "UPDATE_DATA",
          isEdit: true, selectedRow:{key},
          parent: updateData(content.parent, key),
          child: updateData(content.child, key)
        });
      },
      handleDelete: (key: string) => {
        removeData(key,content.parent,content.child);
        dispatch({
          type: "RESET"
        });
      },
      handleCancel: () => {
        updateData(content.parent);
        updateData(content.child);
        dispatch({
          type: "RESET"
        });
      },
      handleSave: () => {
        updateData(content.parent);
        updateData(content.child);
        storeData("parent", content.parent);
        storeData("child", content.child);
        dispatch({
          type: "UPDATE_DATA",
          selectedRow:{key:""},
          isEdit:false,
        });

      }
    }
  ];

  const childColumns = [
    {
      title: "Protocol",
      dataIndex: "protocol",
      key: "protocol",
      width: "25%",
      rules: getRules("child", "Please select protocol!",content)
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      width: "25%",
      rules: getRules("child", "Please enter port number!",content),
      handleDelete: (key: string) => {
        dispatch({
          type: "UPDATE_DATA",
          child: removeChildData(key,content.child)
        });
      }  
    }
  ];
  return (
    <Fragment>
      <Button disabled={content.isEdit} onClick={addRow}>Add New Row </Button>
      <Editable
        dataSource={content.parent || []}
        columns={columns}
        onCellChange={handleCellChange}
        handleAddRow={handleAddRow}
        bordered
        isChild={false}
        expandedRowRender={(object: any) => {
          return ExpandedRowRenderer({
            childColumns,
            childData:content.child,
            handleAddRow,
            object,
            childCellChange
          });
        }}
      />
    </Fragment>
  );
};

export default ExpandableTable;
