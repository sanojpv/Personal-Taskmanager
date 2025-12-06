import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function AppNavbar({ profile }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar
      expand="lg"
      className="mb-3 border-bottom custom-navbar shadow-sm"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #004aad)",
        padding: "0.75rem 0",
      }}
    >
      <Container>
        <Navbar.Brand
          href="/task"
          className="text-uppercase fw-bold custom-navbar-brand text-white"
        >
          Personal Task Manager
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="crm-nav" className="bg-light" />

        <Navbar.Collapse id="crm-nav">
          <Nav className="me-auto"></Nav>

          <div className="d-flex align-items-center">
            {profile && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-profile"
                  className="d-flex align-items-center gap-2 custom-profile-toggle"
                >
                  <FaUserCircle size={22} />
                  <span className="fw-semibold">
                    {profile.name} ({profile.role})
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown">
                  <Dropdown.Item
                    onClick={logout}
                    className="custom-dropdown-item"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
