import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AppNavbar from "../components/layouts/AppNavbar";
import Container from "../ui/Container";
import Card from "../ui/Card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#111827", "#f97316", "#3b82f6", "#10b981", "#8b5cf6"];

const Analytics = () => {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get(`/analytics/${shortCode}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Analytics error:", err);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  if (!data)
    return (
      <div className="min-h-screen bg-gray-50">
        <AppNavbar />
        <Container>
          <div className="py-10 text-center text-gray-600">Loading...</div>
        </Container>
      </div>
    );

  // Format data cleanly
  const lineData = data.clicksByDay.map((item) => ({
    date: item._id,
    clicks: item.count,
  }));

  const countryData = data.countryStats.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const deviceData = data.deviceStats.map((item) => ({
    name: item._id,
    clicks: item.count,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />

      <Container>
        <div className="py-8 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>

          {/* Total Clicks Card */}
          <Card className="p-8 w-72 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 shadow-lg">
            <h2 className="text-gray-500 text-sm font-medium mb-1">
              Total Clicks
            </h2>
            <p className="text-4xl font-bold text-gray-900">
              {data.totalClicks}
            </p>
          </Card>

          {/* Clicks Over Time */}
          <Card className="p-8 bg-gradient-to-br from-white to-gray-50/50 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Clicks Over Time
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#111827"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Country + Device Side By Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Pie Chart */}
            <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Country Distribution
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={countryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Device Bar Chart */}
            <Card className="p-8 bg-gradient-to-br from-white to-green-50/30 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Device Stats
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#111827" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Analytics;
