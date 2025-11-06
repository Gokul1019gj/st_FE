import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setStatus } from "../../features/tasks/taskSlice";
import AppNavbar from "../../components/AppNavbar";
import TaskCard from "../../components/TaskCard";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskBoard() {
  const dispatch = useDispatch();
  const { list, filters } = useSelector((s) => s.tasks);
  const [columns, setColumns] = useState({
    pending: [],
    "in-progress": [],
    completed: [],
  });

  useEffect(() => {
    dispatch(fetchTasks({ ...filters, limit: 100 }));
  }, [dispatch, filters]); // ✅ include filters if you want dynamic reload

  useEffect(() => {
    setColumns({
      pending: list.filter((t) => t.status === "pending"),
      "in-progress": list.filter((t) => t.status === "in-progress"),
      completed: list.filter((t) => t.status === "completed"),
    });
  }, [list]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceList = Array.from(columns[source.droppableId]);
    const [moved] = sourceList.splice(source.index, 1);
    const destList = Array.from(columns[destination.droppableId]);
    destList.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });

    if (moved.status !== destination.droppableId) {
      dispatch(setStatus({ id: moved.id, status: destination.droppableId }));
    }
  };

  const ColBox = ({ id, title, items }) => (
    <Col md={4}>
      <Card className="border-0 shadow-sm mb-3">
        <Card.Header className="fw-semibold">{title}</Card.Header>
        <Card.Body style={{ minHeight: 200 }}>
          <Droppable droppableId={id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((t, idx) => (
                  <Draggable key={t.id} draggableId={String(t.id)} index={idx}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        <TaskCard task={t} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="mb-3">Task Board</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <ColBox id="pending" title="Pending" items={columns["pending"]} />
            <ColBox
              id="in-progress"
              title="In Progress"
              items={columns["in-progress"]}
            />
            <ColBox
              id="completed"
              title="Completed"
              items={columns["completed"]}
            />
          </Row>
        </DragDropContext>
      </Container>
    </>
  );
}
