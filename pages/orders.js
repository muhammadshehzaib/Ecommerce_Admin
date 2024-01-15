import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/order").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td className="text-center">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td
                  className={
                    order.paid
                      ? "text-green-600 text-center"
                      : "text-red-600 text-center"
                  }
                >
                  {order.paid ? "YES" : "NO"}
                </td>
                <td className="text-center">
                  {order.name}
                  <br />
                  {order.city} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td className="text-center">
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
