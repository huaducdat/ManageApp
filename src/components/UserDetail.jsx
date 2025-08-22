import {
  Button,
  Card,
  Result,
  Skeleton,
  Space,
  Descriptions,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button as MuiBtn } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setU] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const flechUser = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setU(res.data);
    } catch (e) {
      setErr("Fail to Fletch");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    flechUser();
  }, [id]);

  if (loading) {
    return (
      <>
        <Skeleton active />
      </>
    );
  }
  if (err || !user?.id) {
    return (
      <Result
        status="error"
        title="Can not Get Data"
        subTitle={err}
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            Return
          </Button>
        }
      />
    );
  }
  const { name, username, email, phone, website, address, company } = user;
  return (
    <Card
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Typography strong style={{ fontSize: "1.2rem" }}>
            User Detail
          </Typography>
          <Space>
            <MuiBtn variant="outlined" onClick={() => navigate(-1)}>
              Back
            </MuiBtn>
            <MuiBtn variant="outlined" component={RouterLink} to={"/"}>
              Home
            </MuiBtn>
          </Space>
        </Space>
      }
    >
      <Descriptions
        bordered
        column={1}
        size="middle"
        items={[
          { key: "name", label: "Name", children: name },
          { key: "username", label: "Username", children: username },
          {
            key: "email",
            label: "Email",
            children: (
              <a href={`mailto:${email}`} rel="noreferer">
                {email}
              </a>
            ),
          },
          {
            key: "phone",
            label: "Phone",
            children: <a href={`tel:${phone}`}>{phone}</a>,
          },
        ]}
      />
    </Card>
  );
}
