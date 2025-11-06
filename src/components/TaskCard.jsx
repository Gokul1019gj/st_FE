import { Card, Dropdown } from "react-bootstrap";
import { StatusBadge, PriorityBadge } from "./badges";

export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return (
    <Card className="shadow-sm border-0 mb-2">
      <Card.Body className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-semibold">{task.title}</div>
          <div className="small text-muted">{task.description || "-"}</div>
          <div className="d-flex gap-2 mt-2">
            <PriorityBadge value={task.priority} />
            <StatusBadge value={task.status} />
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="outline-secondary">⋮</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={onDelete}>Delete</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Change Status</Dropdown.Header>
            <Dropdown.Item onClick={()=>onStatus("pending")}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={()=>onStatus("in-progress")}>In Progress</Dropdown.Item>
            <Dropdown.Item onClick={()=>onStatus("completed")}>Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}
