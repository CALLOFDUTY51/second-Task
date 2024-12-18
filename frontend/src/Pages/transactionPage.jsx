import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions on page load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product/transactions"); // Fetch all transactions
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Transactions</h2>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Cart Items</th>
              <th>Session ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.email}</td>
                <td>{transaction.status}</td>
                <td>
                  {transaction.cart.map((item) => (
                    <div key={item.id}>
                      <strong>{item.name}</strong> x{item.quantity} (${(item.price * item.quantity).toFixed(2)})
                    </div>
                  ))}
                </td>
                <td>{transaction.sessionId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TransactionsPage;
