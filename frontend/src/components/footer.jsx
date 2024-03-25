// Footer.js
import { useEffect, useState } from "react";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "../styles.css";

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始化时检查一次屏幕尺寸
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize); 

    // 在组件卸载时取消事件监听
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#001329",
        padding: "20px",
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        color: "#fff",
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
          <div className="footer-icons" style={{ marginBottom: "10px" }}>
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
            style={{ marginTop: "0px", display: "flex", flexDirection: "row" }}
          >
            <div>Contact us</div>
            <div>Privacy Policy</div>
            <div>Help</div>
          </div>
          <div className="copyright" style={{ marginTop: "6px" }}>
            @2024 All Rights Reserved.
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
