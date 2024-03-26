// Footer.js
import { useEffect, useState } from "react";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 470);
    };

    // 初始化时检查一次屏幕尺寸
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize); //当窗口大小发生变化时，会调用 handleResize 函数, resize 是用于监听的事件名称

    // 在组件卸载时取消事件监听
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#001329",
        padding: "15px",
        position: "fixed",
        bottom: "0",
        left: "0",
        zIndex: 1000,
        width: "100%",
        color: "#fff",
        height: isMobile ? "80px" : "45px",
      }}
    >
      {/* Footer 在大屏幕上的布局 */}
      {!isMobile && (
        <div
          className="desktop-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="copyright">@2024 All Rights Reserved.</div>
          <div className="footer-icons">
            <YoutubeOutlined
              style={{ marginRight: "10px", color: "#fff", fontSize: "20px" }}
            />
            <TwitterOutlined
              style={{ marginRight: "10px", color: "#fff", fontSize: "20px" }}
            />
            <FacebookOutlined style={{ color: "#fff", fontSize: "20px" }} />
          </div>
          <div
            className="footer-links"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <div>Contact us</div>
            <div>Privacy Policy</div>
            <div>Help</div>
          </div>
        </div>
      )}

      {/* Footer 在小屏幕上的布局 */}
      {isMobile && (
        <div
          className="mobile-footer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="footer-icons" style={{ marginBottom: "5px" }}>
            <YoutubeOutlined
              style={{ marginRight: "10px", color: "#fff", fontSize: "20px" }}
            />
            <TwitterOutlined
              style={{ marginRight: "10px", color: "#fff", fontSize: "20px" }}
            />
            <FacebookOutlined style={{ color: "#fff", fontSize: "20px" }} />
          </div>
          <div
            className="footer-links"
            style={{
              marginTop: "0px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              fontSize: "13px",
            }}
          >
            <div>Contact us</div>
            <div>Privacy Policy</div>
            <div>Help</div>
          </div>
          <div
            className="copyright"
            style={{ marginTop: "5px", fontSize: "13px" }}
          >
            @2024 All Rights Reserved.
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
