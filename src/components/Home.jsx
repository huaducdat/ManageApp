import {
  Card,
  ConfigProvider,
  Layout,
  Space,
  Typography,
  theme,
  Alert,
  message,
  Form,
  Input,
  Checkbox,
  Button,
  Image,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import bg from "./MyImg/self-storage-all.png";
import { type } from "@testing-library/user-event/dist/type";
import logo from "./MyImg/CompanyLogo1.png";

const { Title, Text, Link } = Typography;

export default function Home() {
  const [authError, setAuthErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [rememberedEmail, setReEmail] = useState("");

  useEffect(() => {
    document.body.style.margin = 0;
    return () => (document.body.style.margin = "");
  }, []); //prevent jump to mobible preview

  const onFinish = async (values) => {
    setAuthErr("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const { email, password, remember } = values;
    const ok = email === "user@gmail.com" && password === "123456";
    if (!ok) {
      setAuthErr("Wrong Login Information. user@gmail.com | pass:123456");
      setLoading(false);
      return;
    }
    if (remember) {
      localStorage.setItem("remember_email", email);
    } else {
      localStorage.removeItem("remember_email");
    }
    setLoading(false);
    alert("Loging");
  };
  const onFinishFailed = () => {
    setAuthErr("Check the required field, please!");
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.defaultAlgorithm],
        token: {
          borderRadius: 12,
          colorPrimary: "#0cb2ffff",

          boxShadowSecondary: "0 10px 30px rgba(0,0,0,.1)",
        },
        components: {
          Card: { paddingLG: 24 },
          Button: { controlHeight: 42, borderRadius: 12 },
          Input: { borderRadius: 12 },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "stretch",
          placeItems: "center",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,.15)",
          backgroundBlendMode: "overlay",
          gap: 15,
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "transparent",
            borderRadius: 0,
            border: "none",
            padding: 15,
            backdropFilter: "blur(3px)",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Image width={200} src={logo} alt="logo" />
          <Title
            level={6}
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "900",
            }}
          >
            Welcome to DHMall Manage Page.
          </Title>
        </Card>

        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            backdropFilter: "blur(4px)",

            border: "none",
            borderRadius: 6,
          }}
          styles={{
            body: { padding: 24 },
          }}
        >
          <Space
            direction="vertical"
            size={10}
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Title
              level={3}
              style={{
                marginBottom: 0,
              }}
            >
              Login
            </Title>
            <Text type="secondary">Into Manage of DHMall</Text>
          </Space>
          {authError && (
            <Alert
              type="error"
              message={authError}
              showIcon
              style={{ marginTop: 16, marginBottom: 8 }}
            />
          )}
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true, email: rememberedEmail }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
              marginTop: 16,
            }}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Input Email" },
                { type: "email", message: "Email invalid" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="user@gmail.com"
                autoComplete="email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Input Password" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="******"
                autoComplete="current-password"
              ></Input.Password>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Stay in</Checkbox>
              </Form.Item>
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Forget Password?
              </Link>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form>
        </Card>
      </Layout>
    </ConfigProvider>
  );
}
