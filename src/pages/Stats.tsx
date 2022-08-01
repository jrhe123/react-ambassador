import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

interface statsProps {
  code: string;
  revenue: number;
}

function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("stats");
        const data = response.data;
        setStats(data);
      } catch (error) {
        console.error("+++++++", error);
      }
    })();
  }, []);

  return (
    <Layout>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat: statsProps, index: number) => {
              return (
                <tr key={index}>
                  <td>{`http://localhost:5000/${stat.code}`}</td>
                  <td>{stat.code}</td>
                  <td>{stat.revenue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Stats;
