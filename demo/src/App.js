import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sign from "./components/sign";
import Product from "./components/product";
import Header from "./components/header";
import Footer from "./components/footer";
import Create from "./components/create";
import Check from "./components/checkout";
import Error from "./error/error";
// import ProtectedRoute from "./protect";

const { Content } = Layout;
//从 Layout 组件中提取 Content 组件，以便在代码中直接使用它，而不需要每次都写 Layout.Content
function App() {
  return (
    // <AuthContext.Provider value={{ loggedIn, onLogin: handleLogin }}>
    <Router>
      <Layout>
        <Header />
        <Content //页面内容垂直居中显示在页面中间
          style={{
            minHeight: "calc(100vh - 0px - 0px)",
          }}
        >
          <Routes>
            <Route path="/signin" element={<Sign pageName="SignIn" />} />
            <Route path="/signup" element={<Sign pageName="SignUp" />} />
            <Route path="/update" element={<Sign pageName="Update" />} />
            <Route path="/" element={<Product />} />
            <Route path="/create" element={<Create />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
