import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/tasks/taskSlice";
import AppNavbar from "../../components/AppNavbar";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Dashboard(){
  const dispatch = useDispatch();
  const { stats } = useSelector(s=>s.tasks);

  useEffect(()=>{ dispatch(getStats()); },[dispatch]);

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="mb-3">Overview</h3>
        <Row>
          <Col md={4}><Card className="border-0 shadow-sm"><Card.Body><h6 className="text-muted">Pending</h6><div className="display-6">{stats.pending}</div></Card.Body></Card></Col>
          <Col md={4}><Card className="border-0 shadow-sm"><Card.Body><h6 className="text-muted">In Progress</h6><div className="display-6">{stats.inProgress}</div></Card.Body></Card></Col>
          <Col md={4}><Card className="border-0 shadow-sm"><Card.Body><h6 className="text-muted">Completed</h6><div className="display-6">{stats.completed}</div></Card.Body></Card></Col>
        </Row>
      </Container>
    </>
  );
}
