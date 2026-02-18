import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import Button from "../../ui/Button";

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 mb-8">
      <Container>
        <div className="flex justify-between items-center">
          <h1
            className="text-2xl font-bold cursor-pointer italic"
            onClick={() => navigate("/")}
          >
            Pingalo
          </h1>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Dashboard
            </Link>

            {user && (
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
            )}

            <Button size="sm" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppNavbar;
