import uniqid from "uniqid";

export const validateIP = (ip: string) => {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return true;
  }
  return false;
};
export const validatePort = (port: number) => {
  if (
    /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/.test(
      port.toString()
    )
  ) {
    return true;
  }
  return false;
};

export const createNewParentObject = () => {
  const parent = [
    ...JSON.parse(localStorage.getItem("parent") || "[]"),
    {
      key: uniqid(),
      name: "",
      ip: "",
      protocol: "",
      port: 0,
      editable: false
    }
  ];
  localStorage.setItem("parent", JSON.stringify(parent));
  return parent;
};

export const storeData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeData = (key: string, parent: any, child: any) => {
  let newChild = child && child.filter((x: any) => x.parentId !== key);
  let newParent = parent.filter((x: any) => x.key !== key);
  storeData("parent", newParent);
  storeData("child", newChild);
  return { newChild, newParent };
};

export const removeChildData = (key: string, child: any) => {
  let newChild = child && child.filter((x: any) => x.key !== key);
  storeData("child", newChild);
  return newChild;
};

export const createNewChildObject = (parentId: string) => {
  const child = [
    ...JSON.parse(localStorage.getItem("child") || "[]"),
    {
      key: uniqid(),
      port: 0,
      protocol: "",
      parentId: parentId,
      editable: false
    }
  ];
  localStorage.setItem("child", JSON.stringify(child));
  return updateData(child, parentId);
};
export const mappedData = (collection: any, field: string, key: string) => {
  return collection
    .filter((x: any) => x[field] === key)
    .map((x: any) => ({ protocol: x.protocol, port: x.port }));
};
export const handleChange = (
  key: any,
  value: any,
  callback: any,
  type: string,
  content: any
) => {
  const field = key.field ? key.field.split("-")[0] : "";
  const rowIndex = key.field ? key.field.split("-")[1] : "0";
  const record = content.parent.filter(
    (x: any) => x.key !== content.selectedRow.key
  );

  if (["name", "ip"].includes(field)) {
    if (isValueExist(record, field, value)) {
      callback(`${field === "ip" ? "IP address" : field} already exists`);
    }

    if (field === "ip") {
      if (!validateIP(value)) {
        callback(`Invalid IP address`);
      }
    }
  }

  if (["protocol", "port"].includes(field)) {
    const parent = mappedData(content.parent, "key", content.selectedRow.key);
    let child = mappedData(content.child, "parentId", content.selectedRow.key);
    let ojectToBeChecked = <any>{};
    let mergedData = [...parent, ...child];
    if (type === "parent") {
      ojectToBeChecked = parent[0];
      ojectToBeChecked[field] = value;
      mergedData = [...child];
    } else {
      ojectToBeChecked = child[parseInt(rowIndex)];
      ojectToBeChecked[field] = value;
      child = child.filter((x: any, i: number) => i !== parseInt(rowIndex));
      mergedData = [...parent, ...child];
    }

    if (field === "port") {
      if (parseInt(value) <= 0) {
        callback(`Invalid Port`);
      }
    }
    if (isObjectExist(mergedData, ojectToBeChecked)) {
      callback(`Record Already Exists`);
    }
  }
  callback();
};

export const getRules = (type: string, message: string, content: any) => {
  return [
    {
      required: true,
      message
    },
    {
      validator: (key: any, value: any, callback: any) => {
        if (content.selectedRow.key)
         return handleChange(key, value, callback, type, content);
        else return true;
      }
    }
  ];
};

export const dataSource = (key: string) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "[]")
    : [];

export const updateData = (data: any, key?: string) => {
  return data.map((x: any, i: number) => {
    key
      ? (x.parentId
        ? x.parentId === key
        : x.key === key)
        ? (x.editable = true)
        : (x.editable = false)
      : (x.editable = false);
    return x;
  });
};

export const hasData = (data: any) => {
  if (data == null || data === "") {
    return "";
  } else {
    return data;
  }
};

export const isObjectExist = (collection: any, source: any) => {
  const keys = Object.keys(source);
  return collection.filter((c: any) => keys.every(k => c[k] === source[k]))
    .length;
};

export const isValueExist = (collection: any, key: string, value: any) => {
  const mappedData = collection.map((c: any) => c[key]);
  return mappedData.length ? mappedData.includes(value) : false;
};
