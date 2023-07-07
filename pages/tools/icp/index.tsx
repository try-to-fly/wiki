import React, { useState } from "react";
import {
  Layout,
  Input,
  Button,
  Row,
  Col,
  Card,
  Descriptions,
  List,
} from "antd";
import ky from "ky";
import { Wrap } from "@components/Wrap";
import styles from "./styles.module.scss";

const { Content } = Layout;

const DomainInfo = ({ data }) => {
  const { subject, website, whois, dns } = data[0];

  return (
    <div className={styles.container}>
      <Card title="主题">
        <Descriptions>
          <Descriptions.Item label="名称">{subject.name}</Descriptions.Item>
          <Descriptions.Item label="性质">{subject.nature}</Descriptions.Item>
          <Descriptions.Item label="许可证">
            {subject.license}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {subject.updateTime}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="网站">
        <Descriptions>
          <Descriptions.Item label="域名">{website.domain}</Descriptions.Item>
          <Descriptions.Item label="许可证">
            {website.license}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Whois">
        <List
          dataSource={Object.entries(whois)}
          renderItem={([key, value]) => (
            <List.Item>
              <div>
                <>
                  <strong>{key}: </strong>
                  {Array.isArray(value) ? value.join(", ") : value}
                </>
              </div>
            </List.Item>
          )}
        />
      </Card>
      <Card title="DNS">
        <List
          dataSource={Object.entries(dns)}
          renderItem={([key, value]) => (
            <List.Item>
              <div>
                <>
                  <strong>{key}: </strong>
                  {Array.isArray(value)
                    ? value.join(", ")
                    : JSON.stringify(value)}
                </>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

const Icp: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [data, setData] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(e.target.value);
    setDomain(url.hostname);
  };

  const handleSearch = async () => {
    const result = await ky.get(`/api/proxy/icp?domain=${domain}`).json();
    setData(result);
  };

  return (
    <Wrap>
      <div className={styles["search-input"]}>
        <Input
          placeholder="输入网址"
          onChange={handleInputChange}
          suffix={<Button onClick={handleSearch}>查询</Button>}
        />{" "}
      </div>
      <Content>{data && <DomainInfo data={data} />}</Content>
    </Wrap>
  );
};

export default Icp;
