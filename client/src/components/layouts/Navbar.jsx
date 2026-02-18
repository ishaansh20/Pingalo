import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../ui/Container";
import Button from "../../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleNavClick = (sectionId) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <Container>
        <div className="py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-gray-900 cursor-pointer italic"
          >
            Pingalo
          </h1>

          {/* NAV LINKS */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <button
              onClick={() => handleNavClick("hero")}
              className="hover:text-gray-900 transition-colors duration-200"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className="hover:text-gray-900 transition-colors duration-200"
            >
              FEATURES
            </button>
            <button
              onClick={() => handleNavClick("why")}
              className="hover:text-gray-900 transition-colors duration-200"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavClick("cta")}
              className="hover:text-gray-900 transition-colors duration-200"
            >
              CONTACTS
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 text-sm font-medium">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </Link>

                <Button size="sm" onClick={handleGetStarted}>
                  Register
                </Button>
              </>
            ) : (
              <>
                <span className="text-gray-600">Hi, {user?.name}</span>

                <Link
                  to="/dashboard"
                  className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:text-red-500"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </motion.header>
  );
};

export default Navbar;
