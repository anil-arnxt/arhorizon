import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Stats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();
  console.log(param.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproductbycampaignname",
          {
            campaign: param.id,
          }
        );
        setData(response.data);

        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param.id]);
  return (
    <div>
      {data.map((item) => (
        <div key={item.Id}>
          <p>viewscount: {item.viewscount}</p>
          <p>timespend: {item.timespend}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Stats;