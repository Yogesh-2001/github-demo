import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase.config";
import { message, Form } from "antd";
import { TextField, Button } from "@material-ui/core";
const Login = () => {
  const onFinish = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        message.success("logged in success");
        console.log(userCred);
      })
      .catch((error) => {
        message.error("logged in failed");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      style={{
        maxWidth: "360px",
        margin: "150px auto",
        boxShadow: "1px 2px 10px aqua",
        padding: "20px 10px",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <TextField
          type={"email"}
          label="Email"
          placeholder="enter valid email"
          variant="standard"
          className="col-12 my-3"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <TextField
          type={"password"}
          label="Password"
          placeholder="enter password"
          variant="standard"
          className="col-12 my-3"
        />
      </Form.Item>

      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
