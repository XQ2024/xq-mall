// AuthPage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Switch } from "antd";
import Update from "./update";
// import 'antd/dist/antd.css';

const AuthPage = ({ pageName, onSubmit }) => {
  const [form] = Form.useForm();
  const [slogan, setSlogan] = useState("");
  const [submitText, setSubmitText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (pageName === "SignIn") {
      setSlogan("Sign In to your account"); 
      setSubmitText("Sign In");
    } else if (pageName === "SignUp") {
      setSlogan("Sign Up with your account");
      setSubmitText("Create Account");
    } else if (pageName === "Update") {
      setSlogan("Update your password");
      setSubmitText("Update Password");
    }
  }, [pageName]);

  const handleSubmit = (values) => {
    const { email, password } = values;
    // onSubmit(email, password);
    if (pageName === "SignIn") {
      navigate("/signin");
    } else if (pageName === "SignUp") {
      navigate("/signup");
    } else if (pageName === "Update") {
      setIsUpdate(true);
    }
    const userData = isAdmin
      ? { email, password, isAdmin: true }
      : { email, password, isAdmin: false };
  };

  return (
    <>
      {isUpdate ? (
        <Update />
      ) : (
        <div
          style={{
            maxWidth: "90vw", // 限制最大宽度为视口宽度的 90%
            maxHeight: "45vh", // 限制最大高度为视口高度的 90%
            minWidth: "300px", // 设置最小宽度
            minHeight: "200px", // 设置最小高度
            width: "80%", // 设置宽度为100%，使其占满屏幕
            height: "80%",
            margin: "auto",
            padding: "20px",
            position: "absolute",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 添加阴影
          }}
        >
          <h2 style={{ textAlign: "center" }}>{slogan}</h2>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="email" //作为value key
              rules={[
                { required: true, message: "Please input your email!" }, 
                { type: "email", message: "Invalid Email Input!" }, 
              ]}
            >
              <div>
                <label>Email:</label>
                <Input />
              </div>
            </Form.Item>
            {pageName !== "Update" && (
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <div>
                  <label>Password:</label>
                  <Input.Password />
                </div>
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                {submitText}
              </Button>
            </Form.Item>
          </Form>
          {pageName === "SignIn" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "gray",
              }}
            >
              <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
              <div>
                <Link to="/update">Forget Password?</Link>
              </div>
            </div>
          )}
          {pageName === "SignUp" && (
            <div
              style={{
                fontSize: "13px",
                color: "gray",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                Already have an account? <Link to="/signin">Sign In</Link>
              </div>
              <div>
                <Switch
                  checked={isAdmin}
                  onChange={(checked) => setIsAdmin(checked)}
                  checkedChildren="Admin"
                  unCheckedChildren="Regular User"
                  size="small"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AuthPage;
