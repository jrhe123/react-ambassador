import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("rankings");
        const data = response.data;
        setRankings(data);
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
            {Object.keys(rankings).map((key: any, index: number) => {
              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{key}</td>
                  <td>{rankings[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Rankings;
