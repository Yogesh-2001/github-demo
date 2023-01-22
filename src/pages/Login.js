import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { message, Form } from "antd";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/features/alertSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { email, password } = values;
    dispatch(setLoading(true));
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        dispatch(setLoading(false));
        navigate("/dashboard");
        message.success("logged in success");
      })
      .catch((error) => {
        dispatch(setLoading(true));
        console.log(error);
        message.error(error.message);
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
      <p className="m-2">
        Don't have an account ? <Link to="/register">Register</Link>
      </p>
    </Form>
  );
};

export default Login;
