import React from "react";
import { DatePicker, Form, Input, message, Radio, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, Card } from "@material-ui/core";
import { auth, db, storage } from "../../firebase/firebase.config";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const CreateProfile = () => {
  const [progress, setProgress] = useState(0);

  const [details, setDetails] = useState({});
  const onFinish = async (values) => {
    setDetails(values);
    getResumeFileUrl(values.resume[0], values);
    getImageFileUrl(values.profilephoto[0], values);
    details.resume && details.profilephoto && sendData();
  };

  const sendData = async () => {
    const docRef = await addDoc(collection(db, "profiledetails"), {
      ...details,
      dob: details && details.dob.$d,
      //   dob: details && details.dob.$d,
    });
    if (docRef) {
      message.success("Details added success");
      setDetails({});
    } else {
      message.error("some error occured");
    }
  };

  const getImageFileUrl = (value, values) => {
    const storageref = ref(storage, `profile-photos/${value.name}`);
    const uploadTask = uploadBytesResumable(storageref, value.originFileObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(2);
          setDetails({
            ...details,
            profilephoto: downloadUrl && downloadUrl,
          });
          const user = auth.currentUser;
          updateProfile(user, {
            photoURL: downloadUrl,
          });
        });
      }
    );
  };

  const getResumeFileUrl = (value, values) => {
    const storageref = ref(storage, `resumes/${value.name}`);
    const uploadTask = uploadBytesResumable(storageref, value.originFileObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
          console.log(1);
          setDetails({
            ...values,
            resume: downloadUrl && downloadUrl,
          });
          console.log(details);
        });
      }
    );
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Card className="col-md-10 col-sm-11 col-12 mx-auto py-3 px-2 my-5">
      <h4>Create Profile</h4>
      <Form
        onFinish={onFinish}
        layout={"vertical"}
        className="d-flex justify-content-between flex-wrap"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your name!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name={"dob"}
          label="Date of Birth"
          rules={[{ required: true, message: "Please input your DOB!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone No"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="upload profile photo"
          // valuePropName="fileList"
          className="col-md-3 col-sm-5 col-10 mx-2"
          name={"profilephoto"}
          getValueFromEvent={getFile}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/png ,image/jpeg"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="10thschoolname"
          label="10th School Name"
          rules={[
            { required: true, message: "Please input your school name!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="10th %"
          label="10th %"
          rules={[{ required: true, message: "Please input your 10th %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="12thschool"
          label="12th college"
          rules={[
            { required: true, message: "Please input your 12th college!" },
          ]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="12th %"
          label="12th %"
          rules={[{ required: true, message: "Please input your 12th %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="engineering college"
          label="Engineering College"
          rules={[{ required: true, message: "Please input your college!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="engineering branch"
          label="Engineering Branch"
          rules={[{ required: true, message: "Please input your branch!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="Computer Engineering">
              Computer Engineering
            </Select.Option>
            <Select.Option value="IT Engineering">IT Engineering</Select.Option>
            <Select.Option value="Electronics Engineering">
              Electronics Engineering
            </Select.Option>
            <Select.Option value="Electronics & Telecommunication Engineering">
              Electronics & Telecommunication Engineering
            </Select.Option>
            <Select.Option value="Bio-Medical Engineering">
              Bio-Medical Engineering
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="engineering division"
          label="Engineering Division"
          rules={[{ required: true, message: "Please input your division!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="engineering %"
          label="Engineering %"
          rules={[{ required: true, message: "Please input your %!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="engineering aggregate cgpa"
          label="Engineering Aggregate CGPA"
          rules={[{ required: true, message: "Please input your cgpa!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="live kt"
          label="Live KT"
          rules={[{ required: true, message: "Please input your kt!" }]}
          className="col-md-3 col-sm-5 col-10 mx-2"
        >
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="upload resume"
          className="col-md-3 col-sm-5 col-10 mx-2"
          name={"resume"}
          getValueFromEvent={getFile}
        >
          <Upload listType="picture-card" maxCount={1} accept="application/pdf">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <div className="col-12 text-center">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreateProfile;
