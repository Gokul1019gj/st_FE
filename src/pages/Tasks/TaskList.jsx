import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppNavbar from "../../components/AppNavbar";
import Loader from "../../components/Loader";
import TaskFormModal from "../../components/TaskFormModal";
import PaginationBar from "../../components/PaginationBar";
import FilterBar from "../../components/FilterBar";
import {
  fetchTasks,
  createTask,
  updateTaskFull,
  removeTask,
  setStatus,
  setFilters,
  resetFilters,
  getStats,
} from "../../features/tasks/taskSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Dropdown,
  Button,
} from "react-bootstrap";

// 🔹 Helpers for badge colors
const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "danger";
    case "medium":
      return "warning text-dark";
    case "low":
      return "success";
    default:
      return "secondary";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "in-progress":
      return "info text-dark";
    case "completed":
      return "success";
    default:
      return "light";
  }
};

export default function TaskList() {
  const dispatch = useDispatch();
  const { list, loading, meta, filters } = useSelector((s) => s.tasks);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  // Fetch tasks and stats
  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  // Filter actions
  const apply = () => dispatch(fetchTasks({ ...filters, page: 1 }));
  const reset = () => {
    dispatch(resetFilters());
    dispatch(fetchTasks({ page: 1, limit: 10 }));
  };
  const page = (p) => dispatch(setFilters({ page: p }));

  // Save or update a task
  const save = async (form) => {
    if (editing)
      await dispatch(updateTaskFull({ id: editing.id, payload: form }));
    else await dispatch(createTask(form));

    setShow(false);
    setEditing(null);
    dispatch(fetchTasks(filters));
    dispatch(getStats());
  };

  return (
    <>
      <AppNavbar />
      <Container className="main-content py-3 d-flex flex-column">
        {/* Header */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h3 className="fw-semibold">Tasks</h3>
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              onClick={() => {
                setEditing(null);
                setShow(true);
              }}
            >
              <i className="bi bi-plus-lg me-1" /> New Task
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-3 shadow-sm border-0">
          <Card.Body>
            <FilterBar
              filters={filters}
              setFilters={(f) => dispatch(setFilters(f))}
              onApply={apply}
              onReset={reset}
            />
          </Card.Body>
        </Card>

        {/* Tasks Table */}
        <Card className="shadow-sm border-0 flex-grow-1">
          <Card.Body className="p-0">
            {loading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <Table hover className="mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Due</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((t) => (
                      <tr key={t.id}>
                        <td className="fw-semibold">{t.title}</td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: 320 }}
                        >
                          {t.description || "-"}
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill bg-${getPriorityColor(
                              t.priority
                            )}`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill bg-${getStatusColor(
                              t.status
                            )}`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td>
                          {t.dueDate
                            ? new Date(t.dueDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>
                          <Dropdown align="end" drop="down">
                            <Dropdown.Toggle
                              size="sm"
                              variant="outline-secondary"
                              id={`dropdown-${t.id}`}
                            >
                              ⋮
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                              renderOnMount
                              popperConfig={{
                                strategy: "fixed",
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: { offset: [0, 8] },
                                  },
                                ],
                              }}
                            >
                              <Dropdown.Item
                                onClick={() => {
                                  setEditing(t);
                                  setShow(true);
                                }}
                              >
                                ✏️ Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="text-danger"
                                onClick={() => dispatch(removeTask(t.id))}
                              >
                                🗑️ Delete
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Header>Change Status</Dropdown.Header>
                              <Dropdown.Item
                                onClick={() =>
                                  dispatch(
                                    setStatus({ id: t.id, status: "pending" })
                                  )
                                }
                              >
                                ⏸️ Pending
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  dispatch(
                                    setStatus({
                                      id: t.id,
                                      status: "in-progress",
                                    })
                                  )
                                }
                              >
                                🚧 In Progress
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  dispatch(
                                    setStatus({
                                      id: t.id,
                                      status: "completed",
                                    })
                                  )
                                }
                              >
                                ✅ Completed
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                    {!list.length && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-muted"
                        >
                          No tasks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Pagination */}
        <PaginationBar page={meta.page} pages={meta.pages} onChange={page} />

        {/* Task Modal */}
        <TaskFormModal
          show={show}
          onHide={() => {
            setShow(false);
            setEditing(null);
          }}
          onSave={save}
          editing={editing}
        />
      </Container>
    </>
  );
}
