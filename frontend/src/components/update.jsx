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
        transform: "translate(-50%, -50%)", //将元素的中心定位到其包含块的中心
        //使用 translate 函数将元素在水平和垂直方向上分别向左和向上移动
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 添加阴影
        //阴影的属性包括水平偏移量（0），垂直偏移量（4px），模糊半径（8px），颜色
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
