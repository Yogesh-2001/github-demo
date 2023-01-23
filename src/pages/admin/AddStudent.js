import { message, Form } from "antd";
import { TextField, Button } from "@material-ui/core";
import { auth, db } from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const AddStudent = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        await setDoc(doc(db, "students", user && user.uid), {
          admin: false,
          email: user && user.email,
          userId: user && user.uid,
        });
        message.success("student added Successfully");
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
        Add Student
      </Button>
    </Form>
  );
};

export default AddStudent;
