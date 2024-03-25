import { MailOutlined, CloseOutlined } from "@ant-design/icons";

const handleClose = () => {
  console.log("close");
};

const Update = () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        maxHeight: "300px",
        width: "80%", // 设置宽度为100%，使其占满屏幕
        height: "80%",
        margin: "auto",
        padding: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 添加阴影
      }}
    >
      <div style={{ textAlign: "right", marginRight: "5px", marginTop: "5px" }}>
        <CloseOutlined
          style={{ fontSize: "24px", color: "#ccc", cursor: "pointer" }}
          onClick={handleClose}
        />
      </div>
      <MailOutlined
        style={{
          fontSize: "50px",
          color: "#4169E1",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <h4
        style={{
          fontSize: "13px",
          position: "relative",
          top: "40%",
          left: "5%",
        }}
      >
        We have sent the update password link to your email, please check that!
      </h4>
    </div>
  );
};

export default Update;
