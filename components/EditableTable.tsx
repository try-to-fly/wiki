"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { Input, Form } from "antd";

const EditableContext = React.createContext<any>(null);

export const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell: React.FC<any> = ({
  title,
  editing,
  dataIndex,
  record,
  handleSave,
  children,
  ...restProps
}) => {
  const [editingCell, setEditingCell] = useState(editing);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  return (
    <td {...restProps}>
      {editingCell ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
          initialValue={record[dataIndex]}
        >
          <Input
            ref={inputRef}
            onBlur={() => {
              setEditingCell(false);
              save();
            }}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={() => setEditingCell(true)}
        >
          {children}
        </div>
      )}
    </td>
  );
};
