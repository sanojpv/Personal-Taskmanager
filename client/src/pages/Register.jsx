import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      window.location.href = "/task";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #06b6d4 100%)",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card
              className="shadow-lg border-0"
              style={{
                borderRadius: "20px",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Card.Body className="p-5">
                <h3
                  className="text-center mb-4"
                  style={{ fontWeight: "700", color: "#1e293b" }}
                >
                  Create Account
                </h3>

                {error && (
                  <Alert variant="danger" className="text-center fw-semibold">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control
                      className="py-2"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: "10px",
                        borderColor: "#cbd5e1",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="py-2"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: "10px",
                        borderColor: "#cbd5e1",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="py-2"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: "10px",
                        borderColor: "#cbd5e1",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Role</Form.Label>
                    <Form.Select
                      className="py-2 fw-semibold"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      style={{
                        borderRadius: "10px",
                        borderColor: "#cbd5e1",
                      }}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="py-2 fw-semibold"
                      style={{
                        borderRadius: "12px",
                        fontSize: "1rem",
                        background: "linear-gradient(90deg,#4f46e5,#3b82f6)",
                        border: "none",
                      }}
                    >
                      Create account
                    </Button>
                  </div>
                </Form>

                <div className="mt-4 text-center">
                  <a
                    href="/login"
                    className="fw-semibold"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                  >
                    Already have an account? Login
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
