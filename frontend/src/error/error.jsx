import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Error() {
  //Only expressions, functions or classes are allowed as the `default` export.

  const navigate = useNavigate();
  return (
    <div>
      <ExclamationCircleOutlined
        style={{
          display: "flex",
          fontSize: "48px",
          color: "#4169E1",
          justifyContent: "center",
        }}
      />
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Oops, Something went wrong!{" "}
      </p>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          backgroundColor: "#4169E1",
          color: "#fff",
          padding: "10px 20px",
          margin: "0 auto",
          onClick: () => {
            navigate("/product");
          },
        }}
      >
        Go Home
      </Button>
    </div>
  );
}
