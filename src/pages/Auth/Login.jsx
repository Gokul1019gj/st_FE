import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const { loading } = useSelector(s=>s.auth);
  const dispatch = useDispatch(); const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/dashboard");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="shadow border-0 p-4">
            <h3 className="text-center text-primary mb-3">Login</h3>
            <Form onSubmit={submit}>
              <Form.Group className="mb-3"><Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={e=>setForm({...form,email:e.target.value})}/>
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={e=>setForm({...form,password:e.target.value})}/>
              </Form.Group>
              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border"/> : "Login"}
              </Button>
              <div className="text-center mt-3"><small>New user? <Link to="/register">Register</Link></small></div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
