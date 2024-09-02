// src/pages/HomePage.js

import React from "react";
import { Tabs, Typography, Layout } from "antd";
import VegetablesTab from "./VegetablesTab";
import FruitsTab from "./FruitsTab";

const { TabPane } = Tabs;
const { Title } = Typography;
const { Content, Header } = Layout;

const HomePage = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header style={{ backgroundColor: "#1890ff", padding: "" }}>
        <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
          لوحة التحكم - رأفت حسين
        </Title>
      </Header>
      <Content style={{ padding: "20px 40px" }}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <TabPane tab="الخضروات" key="1">
            <VegetablesTab />
          </TabPane>
          <TabPane tab="الفواكه" key="2">
            <FruitsTab />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default HomePage;
