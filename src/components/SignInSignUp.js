import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, TextField } from "@material-ui/core";
import { Checkbox, Form, Input } from "antd";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SignInSignUp = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onFinish = (values) => {
    const { email, password, name } = values;
    if (email && password && name) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = auth.currentUser;
          updateProfile(user, {
            displayName: name,
          });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    } else {
      console.log("Login");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Form
          style={{ maxWidth: "390px" }}
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Form
          style={{ maxWidth: "390px" }}
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
            rules={[
              { required: true, message: "Please input your valid email!" },
            ]}
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
        </Form>
      </TabPanel>
    </div>
  );
};

export default SignInSignUp;
