import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function TaskFormModal({ show, onHide, onSave, editing }) {
  const [form, setForm] = useState({ title:"", description:"", status:"pending", priority:"medium", dueDate:"" });

  useEffect(()=> {
    if (editing) setForm({
      title: editing.title||"", description: editing.description||"",
      status: editing.status||"pending", priority: editing.priority||"medium",
      dueDate: editing.dueDate ? editing.dueDate.slice(0,10) : ""
    });
    else setForm({ title:"", description:"", status:"pending", priority:"medium", dueDate:"" });
  }, [editing, show]);

  const submit=(e)=>{e.preventDefault(); onSave(form);}

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>{editing?"Edit Task":"New Task"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3"><Form.Label>Title</Form.Label>
            <Form.Control required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3"><Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
          </Form.Group>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Priority</Form.Label>
              <Form.Select value={form.priority} onChange={(e)=>setForm({...form,priority:e.target.value})}>
                <option>low</option><option>medium</option><option>high</option>
              </Form.Select></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Status</Form.Label>
              <Form.Select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
                <option>pending</option><option>in-progress</option><option>completed</option>
              </Form.Select></Form.Group></Col>
          </Row>
          <Form.Group><Form.Label>Due Date</Form.Label>
            <Form.Control type="date" value={form.dueDate} onChange={(e)=>setForm({...form,dueDate:e.target.value})}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">{editing?"Update":"Create"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
