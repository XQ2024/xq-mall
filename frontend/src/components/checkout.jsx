import React, { useState } from "react";
import { Row, Col, Card, Button, Input, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;

function ShoppingCartCheckout() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 15, quantity: 2 },
  ]);
  const [discount, setDiscount] = useState(0);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0 //accumulator
  );
  const tax = subTotal * 0.08;
  const disCount = (subTotal * discount) / 100;
  const total = subTotal + tax - disCount;

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };
  const handleIncrement = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrement = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {/* gutter是设置列之间的间距的属性，它是一个数组，包含水平间距和垂直间距的数值。例如，[16,16] 表示
    水平间距和垂直间距都为 16 像素。 span是指定当前列的宽度，它接受一个整数值，表示当前列占据的网格数，
    总共有24 个网格。例如，span={24} 表示当前列占据整个行的宽度。 */}
          <h2>Shopping Cart</h2>
          {cartItems.map((item) => (
            <Card key={item.id}>
              <Meta
                avatar={
                  <img
                    src={`product_${item.id}.jpg`}
                    alt={item.name}
                    style={{ width: 100 }}
                  />
                }
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                }
                description={
                  <Space>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleDecrement(item.id)}
                    />
                    <span>{item.quantity}</span>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleIncrement(item.id)}
                    />

                    <Button type="link" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </Space>
                }
              />
            </Card>
          ))}
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>Promotion</h2>
          <Input.Search
            placeholder="Enter promo code"
            enterButton="Apply"
            onChange={handleDiscountChange}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <hr style={{ marginBottom: "10px", borderColor: "white" }} />
          {/* <Space direction="vertical"> */}
          {/*会在其子组件之间添加指定的间距。在您的代码中，您将 <Space> 组件的 direction 设置为 "vertical"，这意味着它的子组件将沿垂直方向排列，并在它们之间添加指定的间距*/}
          <div>
            {[
              { text: "Subtotal:", align: "left", value: subTotal.toFixed(2) },
              { text: "Tax:", align: "left", value: tax.toFixed(2) },
              { text: "Discount:", align: "left", value: disCount.toFixed(2) },
              {
                text: "Estimated total:",
                align: "left",
                value: total.toFixed(2),
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>{item.text}</div>
                <div style={{ textAlign: item.align }}>${item.value}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCartCheckout;
