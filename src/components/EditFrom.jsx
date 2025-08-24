import { Email } from "@mui/icons-material";
import { Form, Modal, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export default function EditForm({ open, onCancel, onSave, user, onAdd }) {
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const isEdit = !!user;

  const parseAddress = (text = "") => {
    const [suite = "", street = "", city = "", zipcode = ""] = text
      .split(",")
      .map((s) => s.trim());
    return { suite, street, city, zipcode };
  };
  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        isEdit
          ? {
              name: user?.name ?? "",
              username: user?.username ?? "",
              email: user?.email ?? "",
              phone: user?.phone ?? "",
              website: user?.website ?? "",
              address: user?.address
                ? `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
                : "_",
            }
          : { name: "", email: "", phone: "", address: "" }
      );
    } else {
      form.resetFields();
    }
  }, [open, user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const addrObj = parseAddress(values.address);
      values.address = {
        suite: values.address?.suite ?? addrObj.suite ?? "",
        street: values.address?.street ?? addrObj.street ?? "",
        city: values.address?.city ?? addrObj.city ?? "",
        zipcode: values.address?.zipcode ?? addrObj.zipcode ?? "",
      };
      setSaving(true);
      if (user) await onSave?.(values);
      else await onAdd?.(values);
      await sleep(900);
    } catch (_) {
      message.error("Save Fail.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={
        open && user
          ? `Edit User ${user?.name ? `: ${user.name}` : ""}`
          : "Add User"
      }
      // {`Edit User ${user?.name ? `: ${user.name}` : ""}`}
      open={open}
      onOk={handleOk}
      onCancel={saving ? undefined : onCancel}
      okText={saving ? "Saving" : "Save"}
      maskClosable={!saving}
      confirmLoading={saving}
      keyboard={!saving}
      closable={!saving}
      destroyOnClose
    >
      <Form form={form} layout="vertical" disabled={saving}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name.",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter Username" }]}
        >
          <Input placeholder="Please enter Username." />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: false,
              message: "Please enter Email",
            },
            {
              type: "email",
              message: "Invalid Email",
            },
          ]}
        >
          <Input placeholder="user@gmail.com" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter your phone Number." },
          ]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: false,
              message: "Please enter your website  (optinal).",
            },
          ]}
        >
          <Input placeholder="Website.com" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please enter  your Adress.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Suite, Street, City, Zipcode"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
