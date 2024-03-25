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
    //状态更新会触发组件重新渲染，但是这些状态更新必须在 React 渲染周期内完成
    if (pageName === "SignIn") {
      setSlogan("Sign In to your account"); //const 让slogan只在 if 或 else if 语句块内部可见
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
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)", //将元素的中心定位到其包含块的中心
            //使用 translate 函数将元素在水平和垂直方向上分别向左和向上移动
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 添加阴影
            //阴影的属性包括水平偏移量（0），垂直偏移量（4px），模糊半径（8px），颜色
          }}
        >
          <h2 style={{ textAlign: "center" }}>{slogan}</h2>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="email" //作为value key
              rules={[
                { required: true, message: "Please input your email!" }, //这个规则要求输入不能为空
                { type: "email", message: "Invalid Email Input!" }, //这个规则要求输入的是一个合法的邮箱
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
                // label="Password"
                //   labelCol={{ span: 6 }} // 设置 label 的布局，使其占据较少的空间
                //   wrapperCol={{ span: 20 }} // 设置 wrapper 的布局，占据剩余的空间
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
