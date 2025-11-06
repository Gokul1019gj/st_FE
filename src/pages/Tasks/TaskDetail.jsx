import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById, updateTaskFull, setStatus } from "../../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";
import Loader from "../../components/Loader";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";

export default function TaskDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selected } = useSelector(s=>s.tasks);
  const [form, setForm] = useState(null);

  useEffect(()=>{ dispatch(fetchTaskById(id)); }, [dispatch, id]);
  useEffect(()=>{ if(selected) setForm({
    title:selected.title||"", description:selected.description||"",
    priority:selected.priority||"medium", status:selected.status||"pending",
    dueDate: selected.dueDate ? selected.dueDate.slice(0,10) : ""
  }); }, [selected]);

  if (!selected || !form) return (<><AppNavbar /><Container><Loader/></Container></>);

  const save=(e)=>{ e.preventDefault(); dispatch(updateTaskFull({ id:selected.id, payload:form })); }
  const changeStatus=(s)=>dispatch(setStatus({ id:selected.id, status:s }));

  return (
    <>
      <AppNavbar />
      <Container>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h4 className="mb-3">Task Detail</h4>
            <Form onSubmit={save}>
              <Form.Group className="mb-3"><Form.Label>Title</Form.Label>
                <Form.Control value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
              </Form.Group>
              <Row>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Priority</Form.Label>
                  <Form.Select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
                    <option>low</option><option>medium</option><option>high</option>
                  </Form.Select></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Status</Form.Label>
                  <Form.Select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                    <option>pending</option><option>in-progress</option><option>completed</option>
                  </Form.Select></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Due Date</Form.Label>
                  <Form.Control type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/>
                </Form.Group></Col>
              </Row>
              <div className="d-flex gap-2">
                <Button type="submit">Save</Button>
                <Button variant="outline-secondary" onClick={()=>navigate(-1)}>Back</Button>
                <Button variant="outline-warning" onClick={()=>changeStatus("in-progress")}>Mark In-Progress</Button>
                <Button variant="outline-success" onClick={()=>changeStatus("completed")}>Mark Completed</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
