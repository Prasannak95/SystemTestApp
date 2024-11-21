import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Select from "react-select";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const navigationLinks = [
    { label: "Home", href: "#" },
    { label: "Profile", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Help", href: "#" },
  ];

  const metricsOptions = [
    { value: "sales", label: "Sales" },
    { value: "expenses", label: "Expenses" },
    { value: "revenue", label: "Revenue" },
  ];

  const chartData = [
    { name: "Jan", sales: 4000, expenses: 2400, revenue: 1600 },
    { name: "Feb", sales: 3000, expenses: 1398, revenue: 1602 },
    { name: "Mar", sales: 2000, expenses: 9800, revenue: 3900 },
    { name: "Apr", sales: 2780, expenses: 3908, revenue: 2000 },
    { name: "May", sales: 1890, expenses: 4800, revenue: 2181 },
    { name: "Jun", sales: 2390, expenses: 3800, revenue: 2500 },
    { name: "Jul", sales: 3490, expenses: 4300, revenue: 2100 },
  ];

  const heatmapData = [
    {
      metric: "Sales",
      Jan: 4000,
      Feb: 3000,
      Mar: 2000,
      Apr: 2780,
      May: 1890,
      Jun: 2390,
      Jul: 3490,
    },
    {
      metric: "Expenses",
      Jan: 2400,
      Feb: 1398,
      Mar: 9800,
      Apr: 3908,
      May: 4800,
      Jun: 3800,
      Jul: 4300,
    },
    {
      metric: "Revenue",
      Jan: 1600,
      Feb: 1602,
      Mar: 3900,
      Apr: 2000,
      May: 2181,
      Jun: 2500,
      Jul: 2100,
    },
  ];

  const handleMetricChange = (selected) => {
    setSelectedMetrics(selected || []);
  };

  const renderLineChart = () => {
    return (
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedMetrics.map((metric) => (
          <Line
            key={metric.value}
            type="monotone"
            dataKey={metric.value}
            stroke={
              metric.value === "sales"
                ? "#8884d8"
                : metric.value === "expenses"
                ? "#82ca9d"
                : "#ff7300"
            }
          />
        ))}
      </LineChart>
    );
  };

  const renderHeatmapTable = () => {
    return (
      <table className="heatmap-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
          </tr>
        </thead>
        <tbody>
          {heatmapData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.metric}</td>
              {Object.keys(row)
                .filter((key) => key !== "metric")
                .map((month, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      backgroundColor: `rgba(255, 0, 0, ${Math.min(
                        row[month] / 10000,
                        1
                      )})`,
                      color: "#fff",
                    }}
                  >
                    {row[month]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard-container">
      <TopBar onLogout={onLogout} />
      <div className="dashboard-layout">
        {/* <Sidebar links={navigationLinks} /> */}
        <div className="dashboard-content">
          <h2>Performance Metrics</h2>

          {/* Metrics Dropdown */}
          <div className="metrics-dropdown">
            <h3>Select Metrics</h3>
            <Select
              options={metricsOptions}
              isMulti
              onChange={handleMetricChange}
              placeholder="Select metrics..."
              className="metrics-select"
            />
          </div>

          {/* Performance Line Chart */}
          <div className="line-chart-container">
            <h3>Performance Line Chart</h3>
            {selectedMetrics.length > 0 ? (
              renderLineChart()
            ) : (
              <p>Please select metrics to display the chart.</p>
            )}
          </div>

          {/* Heat Map Table */}
          <div className="heatmap-container">
            <h3>Heat Map Table</h3>
            {renderHeatmapTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
