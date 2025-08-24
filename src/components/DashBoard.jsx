import { Layout, List, Menu, Popconfirm, Table, Skeleton, message } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import logoHeader from "./MyImg/CompanyLogo1Black.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditFrom from "./EditFrom";
import { Email } from "@mui/icons-material";

export default function DashBoard() {
  const [editting, setEditting] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleCancel = () => {
    setOpen(false);
    setEditting(null);
  };
  const handleSave = async (values) => {
    if (editting) {
      setUL((prev) =>
        prev.map((u) =>
          u.id === editting.id
            ? {
                ...u,
                name: values.name,
                username: values.username,
                email: values.email,
                phone: values.phone,
                website: values.website,
                address: {
                  ...(u.address || {}),
                  suite: values.address?.suite ?? u.address?.suite ?? "",
                  street: values.address?.street ?? u.address?.street ?? "",
                  city: values.address?.city ?? u.address?.city ?? "",
                  zipcode: values.address.zipcode ?? u.address?.zipcode ?? "",
                },
              }
            : u
        )
      );
      handleCancel();
      message.success("User updated.");
    }
  };

  const handleAdd = async (values) => {
    setUL([values, ...userList]);
    handleCancel();
    message.success("Add.");
  };

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
            to={`/users/${record.id}`}
          >
            View Detail
          </Button>
          <IconButton
            color="primary"
            sx={{ gap: 1, fontSize: 15, borderRadius: 3 }}
            onClick={() => {
              setEditting(record);
              setOpen(true);
            }}
          >
            <EditIcon /> Edit
          </IconButton>
        </Stack>
      ),
    },
  ];
  if (loading) {
    return (
      <>
        <Skeleton active />
      </>
    );
  }
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          color="white"
          fontWeight={900}
          sx={{
            textAlign: "center",
            py: 1,
            width: "100%",
            background: "rgba(100, 167, 255, 1)",
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
          scroll={{ x: "max-content" }}
          style={{ width: "100%" }}
        />

        <Button
          variant="contained"
          sx={{ gap: 1 }}
          onClick={() => {
            setEditting(null);
            setOpen(true);
          }}
        >
          <AddIcon /> Add
        </Button>

        <EditFrom
          open={open}
          onCancel={handleCancel}
          onSave={handleSave}
          user={editting}
          onAdd={handleAdd}
        />
      </Layout.Content>
    </Layout>
  );
}
