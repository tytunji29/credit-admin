import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getDefaulters } from "../api/allApi";

const Users = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getDefaulters().then((data) => setCountries(data));
  }, []);

  return (
    <Layout>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Layout>
  );
};

export default Users;

