import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "antd";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products"); // 假设后端的产品 API 端点是 '/api/products'
        setProducts(response.data); // 假设响应的数据是一个产品对象数组
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = () => {
    // 处理加入购物车逻辑
  };

  const handleEditProduct = () => {
    // 处理编辑产品逻辑
  };

  return (
    <div style={{ width: "94%", paddingTop: "70px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20%",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Products
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <select>
            <option value="last">Last added</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <Button type="primary">Add Product</Button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={product.name} src={product.imageUrl} />}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" onClick={handleAddToCart}>
                Add
              </Button>
              <Button onClick={handleEditProduct}>Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
