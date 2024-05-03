import React, { useState } from "react";
import { Button, Dropdown, Menu, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const items = [
    {
      label: "Development",
      key: "1",
    },
    {
      label: "Production",
      key: "2",
    },
  ];

  const development_applications = [
    {
      key: "1",
      name: "Rearm",
      db_name: "bdog-3401-dass-5069-1245-dev",
    },
    {
      key: "2",
      name: "Konzum",
      db_name: "abce-1234-dsasd-dsds-1234-dev",
    },
  ];

  const production_applications = [
    {
      key: "1",
      name: "Rearm",
      db_name: "bdog-3401-dass-5069-1245-prod",
    },
    {
      key: "2",
      name: "Konzum",
      db_name: "abce-1234-dsasd-dsds-1234-prod",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Database name",
      dataIndex: "db_name",
      key: "db_name",
    },
  ];

  const dataSource =
    selectedMenuItem === "1"
      ? development_applications
      : selectedMenuItem === "2"
      ? production_applications
      : [];

  return (
    <>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            {items.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
      >
        <Button>
          <Space>
            {selectedMenuItem
              ? items.find((item) => item.key === selectedMenuItem).label
              : "Choose your environment"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default App;
