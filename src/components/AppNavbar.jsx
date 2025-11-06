import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; // ✅ Correct import
import { useNavigate, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { toast } from "react-toastify";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.info("Logged out successfully.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/dashboard"
          className="fw-bold text-primary"
        >
          <i className="bi bi-kanban me-2" /> Task Manager
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tasks">
              Tasks
            </Nav.Link>
            <Nav.Link as={NavLink} to="/board">
              Board
            </Nav.Link>
          </Nav>

          <DarkModeToggle />

          <Button
            variant="outline-danger"
            className="ms-3"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1" /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
