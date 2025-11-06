import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById, updateTaskFull, setStatus } from "../../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import Loader from "../../components/Loader";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected } = useSelector((s) => s.tasks);
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the task
  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);

  // Initialize form when data loads
  useEffect(() => {
    if (selected)
      setForm({
        title: selected.title || "",
        description: selected.description || "",
        priority: selected.priority || "medium",
        status: selected.status || "pending",
        dueDate: selected.dueDate ? selected.dueDate.slice(0, 10) : "",
      });
  }, [selected]);

  if (!selected || !form)
    return (
      <>
        <AppNavbar />
        <Container>
          <Loader />
        </Container>
      </>
    );

  // Save handler
  const handleSave = async (e) => {
    e.preventDefault();
    await dispatch(updateTaskFull({ id: selected.id, payload: form }));
    toast.success(" Task updated successfully!");
    setIsEditing(false);
  };

  // Status handler
  const handleStatusChange = (status) => {
    if (status === form.status) return;
    dispatch(setStatus({ id: selected.id, status }));
    toast.info(`Task marked as ${status}`);
  };

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Task Details</h4>
              {!isEditing ? (
                <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
                  <i className="bi bi-pencil-square me-1" />
                  Edit
                </Button>
              ) : (
                <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                  <i className="bi bi-x-circle me-1" />
                  Cancel
                </Button>
              )}
            </div>

            <Form onSubmit={handleSave}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={form.title}
                  disabled={!isEditing}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  disabled={!isEditing}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </Form.Group>

              <Row>
                {/* Priority */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      value={form.priority}
                      disabled={!isEditing}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      <option>low</option>
                      <option>medium</option>
                      <option>high</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Status */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={form.status}
                      disabled={!isEditing}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option>pending</option>
                      <option>in-progress</option>
                      <option>completed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Due Date */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.dueDate}
                      disabled={!isEditing}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex flex-wrap gap-2 mt-3">
                {isEditing && (
                  <Button type="submit" variant="primary">
                    <i className="bi bi-check2-circle me-1" />
                    Save Changes
                  </Button>
                )}
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                  <i className="bi bi-arrow-left me-1" />
                  Back
                </Button>

                {/* Conditional action buttons */}
                {form.status !== "in-progress" && (
                  <Button
                    variant="outline-warning"
                    onClick={() => handleStatusChange("in-progress")}
                  >
                    🚧 Mark In-Progress
                  </Button>
                )}
                {form.status !== "completed" && (
                  <Button
                    variant="outline-success"
                    onClick={() => handleStatusChange("completed")}
                  >
                    ✅ Mark Completed
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
