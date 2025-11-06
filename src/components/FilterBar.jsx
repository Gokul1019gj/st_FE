import { Row, Col, Form, Button } from "react-bootstrap";

export default function FilterBar({ filters, setFilters, onApply, onReset }) {
  return (
    <Row className="g-2">
      <Col md={4}>
        <Form.Control placeholder="Search by title..." value={filters.search}
          onChange={(e)=>setFilters({ ...filters, search:e.target.value })}/>
      </Col>
      <Col md={3}>
        <Form.Select value={filters.status} onChange={(e)=>setFilters({ ...filters, status:e.target.value })}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={filters.priority} onChange={(e)=>setFilters({ ...filters, priority:e.target.value })}>
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>
      </Col>
      <Col md={2} className="text-end">
        <Button variant="outline-secondary" className="me-2" onClick={onReset}>Reset</Button>
        <Button onClick={onApply}>Apply</Button>
      </Col>
    </Row>
  );
}
