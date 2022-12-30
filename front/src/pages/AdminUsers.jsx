import { Fragment, useEffect, useState } from "react";
import { Container, Col, Table } from "react-bootstrap";
import Axios from "../api/axios-client";

export default function AdminUsers() {
  const [analysis, setAnalysis] = useState([]);

  const getAnalysis = async () => {
    const res = await Axios.post("/products/get_country_analysis");
    setAnalysis(res.data);
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {analysis.map((a, idx) => (
            <tr key={idx}>
              <td>{a.country}</td>
              <td>{a.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
