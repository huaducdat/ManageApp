import { Email } from "@mui/icons-material";
import { Form, Modal, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export default function EditForm({ open, onCancel, onSave, user }) {
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const isEdit = !!user;

  useEffect(() => {
    if (open) {
      form.setFieldValue(
        isEdit
          ? {
              name: user?.name,
              email: user?.email,
              phone: user?.phone,
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
      const value = await form.validateFields();
      setSaving(true);
      onSave(value);
      await sleep(900);
    } catch (_) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={`Edit User ${user?.name ? `: ${user.name}` : ""}`}
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
        <FormItem
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: "Please enter name.",
            },
          ]}
        >
          <Input placeholder="User Name" />
        </FormItem>
        <FormItem
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter Email",
            },
            {
              type: "email",
              message: "Invalid Email",
            },
          ]}
        >
          <Input placeholder="user@gmail.com" />
        </FormItem>
        <FormItem
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter your phone Number." },
            { type: "number", message: "Invalid phone Number" },
          ]}
        >
          <Input placeholder="Phone number" />
        </FormItem>
        <FormItem
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
            placeholder="Suite,  Street, City, Zipcode"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
}
