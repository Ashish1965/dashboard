import { useState, useEffect } from "react";
import { Bar, Line, Pie, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import axios from "axios";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  async function fetchData() {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const response = await axios.get(`/api/getData?${query}`);
      // const response = await fetch(`http://localhost:3000/api/getData?${query}`);
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  }

  const intensityData = data.map((item) => item.intensity);
  const likelihoodData = data.map((item) => item.likelihood);
  const relevanceData = data.map((item) => item.relevance);
  const years = data.map((item) => item.start_year || "N/A");
  const topics = data.map((item) => item.topic);

  const barChartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        data: intensityData,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: years,
    datasets: [
      {
        label: "Likelihood",
        data: likelihoodData,
        borderColor: "rgba(255,99,132,0.6)",
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: topics,
    datasets: [
      {
        data: relevanceData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const radarChartData = {
    labels: ["Intensity", "Likelihood", "Relevance"],
    datasets: [
      {
        label: "Data Metrics",
        data: [intensityData[0] || 0, likelihoodData[0] || 0, relevanceData[0] || 0],
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
      },
    ],
  };

  const polarChartData = {
    labels: topics,
    datasets: [
      {
        data: relevanceData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h1>Energy Dashboard</h1>
      <div>
        <label>End Year:</label>
        <input type="text" name="endYear" onChange={handleFilterChange} />
        <label>Topic:</label>
        <input type="text" name="topic" onChange={handleFilterChange} />
        <label>Sector:</label>
        <input type="text" name="sector" onChange={handleFilterChange} />
        {/* Add additional filter inputs as needed */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "45%" }}>
          <Bar data={barChartData} />
        </div>
        <div style={{ width: "45%" }}>
          <Line data={lineChartData} />
        </div>
        <div style={{ width: "45%" }}>
          <Pie data={pieChartData} />
        </div>
        <div style={{ width: "45%" }}>
          <Radar data={radarChartData} />
        </div>
        <div style={{ width: "45%" }}>
          <PolarArea data={polarChartData} />
        </div>
      </div>
    </div>
  );
}
