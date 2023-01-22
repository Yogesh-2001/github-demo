import { message, Form } from "antd";
import { TextField, Button } from "@material-ui/core";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { setLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { email, password, name } = values;
    dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: name,
        });
        message.success("Registered Successfully");
        navigate("/dashboard");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        message.error(error.message);
        dispatch(setLoading(true));
        // ..
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
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <TextField
          type={"text"}
          label="Name"
          placeholder="enter name"
          variant="standard"
          className="col-12 my-3"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your valid email!" }]}
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
        Register
      </Button>
      <p className="mt-2">
        Already have an account ? <Link to="/">Login</Link>
      </p>
    </Form>
  );
};

export default Register;
