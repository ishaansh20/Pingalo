import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import AppNavbar from "../components/layouts/AppNavbar";
import Container from "../ui/Container";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [urls, setUrls] = useState([]);

  const baseUrl =
    import.meta.env.VITE_SHORT_URL_BASE || "http://localhost:5000";

  // Calculate total clicks
  const totalClicks = urls.reduce(
    (sum, item) => sum + (item.clickCount || 0),
    0,
  );

  // Find top performer safely
  const topPerformer =
    urls.length > 0
      ? [...urls].sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))[0]
      : null;

  // Fetch URLs
  const fetchUrls = async () => {
    try {
      const { data } = await api.get("/url/my-urls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUrls(data);
    } catch (err) {
      console.log("Error fetching URLs", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Create URL
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/url/shorten",
        { originalUrl: url },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setShortLink(data.shortUrl);
      setUrl("");
      fetchUrls();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating short URL");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/url/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUrls();
    } catch (err) {
      alert("Error deleting URL");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />

      <Container>
        <div className="py-8 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          {/* Stats Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Links
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {urls.length}
              </h2>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-blue-50/30">
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Clicks
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {totalClicks}
              </h2>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-orange-50/30">
              <p className="text-gray-500 text-sm font-medium mb-1">
                Top Performer
              </p>
              <h2 className="text-lg font-bold text-gray-900 mt-2 truncate">
                {topPerformer ? `${baseUrl}/${topPerformer.shortCode}` : "—"}
              </h2>
            </Card>
          </div>

          {/* Create URL */}
          <Card className="p-8 bg-gradient-to-br from-white via-gray-50 to-orange-50/20 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create Short URL
            </h2>
            <form onSubmit={handleCreate} className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your long URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white shadow-sm"
              />
              <Button type="submit" size="md">
                Shorten
              </Button>
            </form>
          </Card>

          {/* Recently Created */}
          {shortLink && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200 shadow-md">
              <p className="mb-2 font-medium text-gray-900">Your Short Link:</p>
              <a
                href={shortLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 hover:text-orange-600 font-medium transition-colors duration-200 underline"
              >
                {shortLink}
              </a>
            </Card>
          )}

          {/* URL List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Links
            </h2>

            {urls.length === 0 ? (
              <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50">
                <p className="text-gray-500">No URLs created yet.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {urls.map((item) => {
                  const fullShortUrl = `${baseUrl}/${item.shortCode}`;

                  return (
                    <Card
                      key={item._id}
                      className="p-6 bg-gradient-to-br from-white to-gray-50/50 shadow-sm"
                      hover
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        {/* Left Section */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 truncate mb-1">
                            {item.originalUrl}
                          </p>

                          <a
                            href={fullShortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200 underline"
                          >
                            {fullShortUrl}
                          </a>

                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Clicks:</span>{" "}
                            {item.clickCount || 0}
                          </p>
                        </div>

                        {/* QR Code */}
                        <div className="flex-shrink-0">
                          <QRCodeCanvas
                            value={fullShortUrl}
                            size={90}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              navigator.clipboard.writeText(fullShortUrl);
                              alert("Copied!");
                            }}
                          >
                            Copy
                          </Button>

                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(`/analytics/${item.shortCode}`)
                            }
                          >
                            Analytics
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
