import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert, Badge, Card } from "react-bootstrap";
import api from "../services/api";
import AppNavbar from "../components/Navbar.jsx";

export default function Task() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "Pending", due_date: "" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const loadProfile = async () => {
    const { data } = await api.get("/auth/profile");
    setProfile(data);
  };

  const loadTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    loadProfile();
    loadTasks();
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", status: "Pending", due_date: "" });
    setEditingId(null);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
        setMsg("Task updated successfully");
      } else {
        await api.post("/tasks", form);
        setMsg("Task created successfully");
      }
      resetForm();
      loadTasks();
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      alert(e.response?.data?.message || "Save failed");
    }
  };

  const editRow = (t) => {
    setEditingId(t._id);
    setForm({
      title: t.title || "",
      description: t.description || "",
      status: t.status || "Pending",
      due_date: t.due_date || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setMsg("Task deleted");
      loadTasks();
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <AppNavbar profile={profile} />

      <div style={{ background: "#f3f4f6", minHeight: "100vh", paddingTop: "20px" }}>
        <Container className="py-3">

          {msg && (
            <Alert variant="success" className="fw-semibold text-center shadow-sm">
              {msg}
            </Alert>
          )}

          {/* Form card */}
          <Card className="shadow-sm mb-4" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <h4 className="fw-bold mb-3">Manage Tasks</h4>

              <Form onSubmit={save}>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Control
                      placeholder="Title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      placeholder="Description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      required
                    />
                  </Col>

                  <Col md={3}>
                    <Form.Select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      type="date"
                      value={form.due_date}
                      onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                      required
                    />
                  </Col>

                  <Col md={12} className="mt-2 d-flex gap-2">
                    <Button type="submit" className="fw-semibold px-4">
                      {editingId ? "Update Task" : "Create Task"}
                    </Button>

                    {editingId && (
                      <Button variant="secondary" className="fw-semibold" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Table card */}
          <Card className="shadow-sm" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <h5 className="fw-bold mb-3">Task List</h5>

              <Table bordered hover responsive className="align-middle shadow-sm">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th style={{ width: 150 }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No tasks available
                      </td>
                    </tr>
                  ) : (
                    tasks.map((t) => (
                      <tr key={t._id}>
                        <td className="fw-semibold">{t.title}</td>
                        <td>{t.description || "—"}</td>

                        <td>
                          <Badge
                            bg={t.status === "Completed" ? "success" : "warning"}
                            className="px-3 py-2"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {t.status}
                          </Badge>
                        </td>

                        <td>{t.due_date || "—"}</td>

                        <td className="d-flex gap-2">
                          <Button size="sm" variant="primary" className="px-3" onClick={() => editRow(t)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="danger" className="px-3" onClick={() => remove(t._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
