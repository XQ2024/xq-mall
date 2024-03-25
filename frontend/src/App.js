import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sign from "./components/sign";
import Header from "./components/header";
import Footer from "./components/footer";
import Error from "./error/error";
// import ProtectedRoute from "./protect";

const { Content } = Layout;
function App() {
  return (
    // <AuthContext.Provider value={{ loggedIn, onLogin: handleLogin }}>
    <Router>
      <Layout>
        <Header />
        <Content 
          style={{
            minHeight: "calc(100vh - 0px - 0px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route path="/signin" element={<Sign pageName="SignIn" />} />
            <Route path="/signup" element={<Sign pageName="SignUp" />} />
            <Route path="/update" element={<Sign pageName="Update" />} />
            {/* <Route path="/product" element={< />} /> */}
            <Route path="/error" element={<Error />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
