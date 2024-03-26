import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Row, Col, Space, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, logout } from "../redux/userSlice";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemCount = 10;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 470); //768
    };

    handleResize(); // 初始加载时执行一次
    window.addEventListener("resize", handleResize); // 监听窗口大小变化
    return () => {
      window.removeEventListener("resize", handleResize); // 组件卸载时移除监听器
    };
  }, []);

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <Header
      style={{
        backgroundColor: "#001329",
        padding: "10px",
        color: "#fff",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "1000",
        height: isMobile ? "80px" : "53px",
      }}
    >
      {!isMobile ? (
        <Row
          align="middle"
          justify="space-between"
          style={{ margin: "-18px 25px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {/* 在底部水平线上对齐 */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Management
            </div>
            <div style={{ fontSize: "10px", marginLeft: "5px" }}>Chuwa</div>
          </div>
          {/* <Col flex="auto">  是 Ant Design 中<Col>组件的一个属性设置,作用是让搜索栏（<Search> 组件）占据剩余的空间 */}
          {/*  flex="auto" 表示这一列的宽度会自动填充剩余的空间 */}
          <div
            className="search-container"
            style={{
              display: "flex",
              alignItems: "center",
              flex: 0.3,
            }}
          >
            <Search placeholder="Search" />
          </div>
          <Col>
            {/* <Space size="small"> */}
            <Space style={{ marginRight: "-20px" }}>
              <Button
                type="text"
                icon={<UserOutlined style={{ color: "#fff" }} />}
                onClick={isLoggedIn ? handleSignOut : () => navigate("/signin")}
                style={{ color: "#fff" }}
              >
                {isLoggedIn ? "Sign out" : "Sign in"}
              </Button>
              <Button
                type="text"
                icon={
                  <div>
                    {cartItemCount > 0 && (
                      <Badge count={cartItemCount} size="small">
                        <ShoppingCartOutlined
                          style={{ color: "#fff", fontSize: "20px" }}
                        />
                      </Badge>
                    )}
                    {cartItemCount === 0 && (
                      <ShoppingCartOutlined style={{ color: "#fff" }} />
                    )}
                  </div>
                }
                onClick={() => console.log("Shopping cart clicked")}
                style={{ color: "#fff" }}
              >
                $0.00
              </Button>
            </Space>
          </Col>
        </Row>
      ) : (
        <>
          <Row
            align="middle"
            justify="space-between"
            style={{ margin: "-20px 20px" }}
          >
            <div style={{ display: "flex", alignItems: "baseline" }}>
              {/* 在底部水平线上对齐 */}
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                M
              </div>
              <div style={{ fontSize: "10px", marginLeft: "0px" }}>Chuwa</div>
            </div>
            <Space size="small" style={{ marginRight: "-20px" }}>
              <Button
                type="text"
                icon={<UserOutlined style={{ color: "#fff" }} />}
                onClick={() => console.log("User clicked")}
                style={{ color: "#fff" }}
              />
              <Button
                type="text"
                icon={
                  <div>
                    {cartItemCount > 0 && (
                      <Badge count={cartItemCount} size="small">
                        <ShoppingCartOutlined
                          style={{ color: "#fff", fontSize: "20px" }}
                        />
                      </Badge>
                    )}
                    {cartItemCount === 0 && (
                      <ShoppingCartOutlined style={{ color: "#fff" }} />
                    )}
                  </div>
                }
                onClick={() => console.log("Shopping cart clicked")}
                style={{ color: "#fff" }}
              >
                $0.00
              </Button>
            </Space>
          </Row>
          <Row align="middle" justify="center">
            <div
              className="search-container"
              style={{
                flex: 0.95,
                marginTop: "5px",
              }}
            >
              <Search placeholder="Search" />
              {/* <Input.Search
                placeholder="Search"
                onSearch={handleSearch}
                // enterButton={
                //   <button style={{ height: "30px", color: "#fff" }}>
                //     <SearchOutlined />
                //   </button>
                // } // 自定义按钮样式
              /> */}
            </div>
          </Row>
        </>
      )}
    </Header>
  );
};

export default AppHeader;
