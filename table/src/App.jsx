import React, { useState } from "react";
import { Button, Dropdown, Menu, Space, Table, Modal, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import "./App.css";
import { useRef } from "react";
import Highlighter from "react-highlight-words";
function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const handleRowDoubleClick = (record) => {
    setSelectedName(record.name);
    console.log(record);

    Modal.info({
      title: "Details",
      content: (
        <div>
          <p>Name: {record.name}</p>
          <p>{record.description}</p>
        </div>
      ),
    });
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
      id: 1,
      key: "1",
      name: "Rearm",
      db_name: "bdog-3401-dass-5069-1245-dev",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum velit odio perferendis quis voluptas consequatur maxime provident mollitia libero, aliquam magnam beatae. Ipsam laborum magni harum eos voluptatem quos?",
    },
    {
      id: 2,
      key: "2",
      name: "Konzum",
      db_name: "abce-1234-dsasd-dsds-1234-dev",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat obcaecati pariatur necessitatibus tempore optio quos, ullam sit quaerat reiciendis consequuntur incidunt! Minus necessitatibus impedit cum nihil esse totam tempore?",
    },
  ];

  const production_applications = [
    {
      id: 1,
      key: "1",
      name: "Rearm",
      db_name: "bdog-3401-dass-5069-1245-prod",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat obcaecati pariatur necessitatibus tempore optio quos, ullam sit quaerat reiciendis consequuntur incidunt! Minus necessitatibus impedit cum nihil esse totam tempore?",
    },
    {
      id: 2,
      key: "2",
      name: "Konzum",
      db_name: "abce-1234-dsasd-dsds-1234-prod",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat obcaecati pariatur necessitatibus tempore optio quos, ullam sit quaerat reiciendis consequuntur incidunt! Minus necessitatibus impedit cum nihil esse totam tempore?",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => {
        return a.id > b.id;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onCell: (record) => ({
        onDoubleClick: () => handleRowDoubleClick(record),
      }),
      className: "name-cell",
      ...getColumnSearchProps("name"),
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
