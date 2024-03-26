import React, { useState } from "react";
import { Button } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import "../styles.css";

function Create() {
  const [imageUrl, setImageUrl] = useState("https://");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleUpload = () => {
    setPreviewUrl(imageUrl);
    console.log(previewUrl);
  };

  return (
    <div
      style={{
        paddingTop: "45px",
        maxWidth: "400px",
        height: "75vh",
        minHeight: "300px",
        width: "90vw",
        margin: "auto",
        padding: "10px",
      }}
    >
      <p style={{ fontSize: 18, fontWeight: "bold" }}>Create Product</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexwrap: "wrap",
          backgroundColor: "white",
          padding: "10px",
          color: "grey",
          marginTop: "-5px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          Product Name
          <input type="text" />
          Product Description
          <textarea></textarea>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            flexWrap: "wrap", // 这里添加了flexWrap属性，以便在移动设备上转行显示
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "80px",
              marginRight: "10px",
            }}
          >
            Category
            <select>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "190px",
            }}
          >
            Price
            <input type="text" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "160px",
            }}
          >
            In Stock Quantity
            <input type="text" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "190px",
            }}
          >
            Add Image Link
            <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type="text"
                value={imageUrl}
                onChange={handleInputChange}
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  position: "absolute",
                  right: 5,
                  top: 2.5,
                  width: "50px",
                  height: "80%",
                  fontSize: "12px",
                  padding: "0px",
                  // lineHeight: "8px",
                }}
                onClick={() => handleUpload()}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              marginTop: "10px",
              border: "1px dashed grey",
              height: "50%",
              width: "60%",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {previewUrl ? (
              <div>
                <img
                  src={previewUrl}
                  alt="preview"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            ) : (
              <>
                <FileImageOutlined />
                image Preview!
              </>
            )}
          </div>
        </div>
        <Button
          type="primary"
          // onClick={handle}
          style={{ marginTop: 10, width: "40%" }}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default Create;
