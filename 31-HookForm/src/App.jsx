import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Form, Input, Button, Space, Select, message } from "antd";
import formSchema from "./schema/formSchema";

const { Option } = Select;
const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", data);
      message.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit form");
    }
  };
  const onReset = () => {
    console.log("Reset function called");
    setValue("name", "");
    setValue("email", "");
  };



  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <div className="inp">
        <Form.Item
          className="nameinp"
          label="Name"
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Input {...register("name")} />
        </Form.Item>
        <Form.Item
          className="mailinp"
          label="Email"
          required
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Input {...register("email")} />
        </Form.Item>
      </div>
      <Select
        className="select"
        defaultValue=""
        style={{ width: 300 }}
        onChange={(value) => setValue("identificationType", value)}
      >
        <Option value="">Choose...</Option>
        <Option value="AA">AA</Option>
        <Option value="AZE">AZE</Option>
      </Select>

      {watch("identificationType") === "AA" && (
        <Form.Item
          className="identification-number"
          label="Identification Number"
          required
          validateStatus={errors.identificationNumber ? "error" : ""}
          help={errors.identificationNumber?.message}
        >
          <Input {...register("identificationNumber")} maxLength={7} />
        </Form.Item>
      )}

      {watch("identificationType") === "AZE" && (
        <Form.Item
          className="identification-number"
          label="Identification Number"
          required
          validateStatus={errors.identificationNumber ? "error" : ""}
          help={errors.identificationNumber?.message}
        >
          <Input {...register("identificationNumber")} maxLength={8} />
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default MyForm;
