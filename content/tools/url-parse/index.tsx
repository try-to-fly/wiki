"use client";

import React, { useState, useEffect } from "react";
import { Input, Table, Button, Row, Col, message } from "antd";
import { EditableCell, EditableRow } from "@components/EditableTable";
import copy from "copy-to-clipboard";
import styles from "./UrlParser.module.scss";
import { Wrap } from "@components/Wrap";

const UrlParser: React.FC = () => {
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState({
    host: "",
    queryString: [],
    params: [],
    pathname: "",
    hash: "",
  });

  const parseUrl = (url: string) => {
    console.log(url);
    try {
      const urlObj = new URL(url);
      const host = urlObj.host;
      const pathname = urlObj.pathname;
      const hash = urlObj.hash;
      const queryString = Array.from(urlObj.searchParams.entries()).map(
        (entry, index) => ({
          key: index,
          paramKey: entry[0],
          paramValue: entry[1],
        })
      );
      const params = queryString;

      setUrlData({
        host,
        pathname,
        hash,
        queryString,
        params,
      });
    } catch (error) {
      message.error("URL解析失败");
      setUrlData({
        host: "",
        pathname: "",
        hash: "",
        queryString: [],
        params: [],
      });
    }
  };

  const updateUrl = () => {
    try {
      const urlObj = new URL(url);
      urlObj.search = new URLSearchParams(
        urlData.params.map(({ paramKey, paramValue }) => [paramKey, paramValue])
      ).toString();
      setUrl(urlObj.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (url) {
      updateUrl();
    }
  }, [urlData.params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputUrl = e.target.value.trim();
    setUrl(inputUrl);
    if (inputUrl) {
      parseUrl(inputUrl);
    }
  };

  const handleCopy = (text: string) => {
    copy(text);
    message.success("复制成功");
  };

  const handleDelete = (key: React.Key) => {
    const params = [...urlData.params];
    console.log(params, key, urlData);
    setUrlData({
      ...urlData,
      params: params.filter((item) => item.key !== key),
    });
  };

  const handleAdd = () => {
    const newKey =
      urlData.params.length > 0
        ? urlData.params[urlData.params.length - 1].key + 1
        : 0;
    const newRow = { key: newKey, paramKey: "key", paramValue: "value" };
    setUrlData({ ...urlData, params: [...urlData.params, newRow] });
  };

  const handleSave = (row: any) => {
    const newData = [...urlData.params];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, row);
    setUrlData({ ...urlData, params: newData });
    updateUrl();
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: "键",
      dataIndex: "paramKey",
      key: "paramKey",
      editable: true,
      width: "45%",
      render: (text: string) => (
        <span className={styles.copyable} onClick={() => handleCopy(text)}>
          {text}
        </span>
      ),
    },
    {
      title: "值",
      dataIndex: "paramValue",
      key: "paramValue",
      editable: true,
      width: "45%",
      render: (text: string) => (
        <span className={styles.copyable} onClick={() => handleCopy(text)}>
          {text}
        </span>
      ),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: "10%",
      render: (_: any, record: { key: React.Key }) => (
        <Button type="link" onClick={() => handleDelete(record.key)}>
          删除
        </Button>
      ),
    },
  ];

  const editableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
        handleSave: handleSave,
      }),
    };
  });

  const tableDataSource = url ? urlData.params : [];

  return (
    <Wrap gptUrl="https://sharegpt.com/c/oq2Yxrc">
      <div className={styles.container}>
        <Input.TextArea
          placeholder="请输入一个URL"
          value={url}
          onChange={handleInputChange}
          className={styles.input}
          autoSize
        />
        <Row gutter={16} className={styles.row}>
          {urlData.host && (
            <Col span={8} className={styles.col}>
              <h4>host:</h4>
              <p onClick={() => handleCopy(urlData.host)}>{urlData.host}</p>
            </Col>
          )}
          {urlData.pathname && (
            <Col span={8} className={styles.col}>
              <h4>path:</h4>
              <p onClick={() => handleCopy(urlData.pathname)}>
                {urlData.pathname}
              </p>
            </Col>
          )}
          {urlData.hash && (
            <Col span={8} className={styles.col}>
              <h4>hash:</h4>
              <p onClick={() => handleCopy(urlData.hash)}>{urlData.hash}</p>
            </Col>
          )}
        </Row>

        {url && (
          <div className={styles.section}>
            {tableDataSource.length > 0 && (
              <>
                <h4>query:</h4>
                <div className={styles.table}>
                  <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    dataSource={tableDataSource}
                    columns={editableColumns}
                    pagination={false}
                    rowKey="key"
                    size="small"
                    style={{ minWidth: "100%" }}
                  />
                </div>
              </>
            )}
            {url && (
              <Button
                onClick={handleAdd}
                type="primary"
                style={{ marginTop: 16, float: "right" }}
              >
                新增参数
              </Button>
            )}
          </div>
        )}
      </div>
    </Wrap>
  );
};

export default UrlParser;
