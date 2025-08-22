import { Layout, List, Menu, Popconfirm, Table } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import logoHeader from "./MyImg/CompanyLogo1Black.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

export default function DashBoard() {
  const [userList, setUL] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const flechData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUL(res.data);
    } catch (err) {
      setErr("Fail while get data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    flechData();
  }, []);

  const cols = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Website", dataIndex: "website", key: "website" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          <Popconfirm
            title="Do you want to remove this user?"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              setUL((prev) => prev.filter((u) => u.id !== record.id));
            }}
          >
            <Button variant="outlined">Remove</Button>
          </Popconfirm>

          <Button
            variant="contained"
            component={RouterLink}
            to={`/DashBoard/${record.id}`}
          >
            View Detail
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 1)",
          padding: "0 15px",
          borderBottom: "1px solid black",
        }}
      >
        <div
          style={{
            objectFit: "contain",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
          }}
        >
          <img
            src={logoHeader}
            alt="logo"
            style={{ objectFit: "contain", height: "60px" }}
          />
          <MuiLink
            component={RouterLink}
            to={"/"}
            underline="hover"
            color="primary"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "black",
              transform: "translateY(-3px)",
              "&:hover": {
                color: "rgba(0, 119, 255, 1)",
              },
            }}
          >
            Home
          </MuiLink>
        </div>
      </Layout.Header>
      <Layout.Content
        style={{
          background: "rgba(207, 207, 207, 1)",
        }}
      >
        <Typography
          variant="h4"
          color="white"
          sx={{
            textAlign: "center",
            py: 1,
            width: "100%",
            background: "rgba(128, 128, 128, 1)",
          }}
        >
          User Manager
        </Typography>
        <Table
          dataSource={userList}
          columns={cols}
          rowKey="id"
          pagination={{ pageSize: 9 }}
          size="middle"
        />
      </Layout.Content>
    </Layout>
  );
}
