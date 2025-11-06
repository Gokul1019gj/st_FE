import { Pagination } from "react-bootstrap";
export default function PaginationBar({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const items = [];
  for (let p=1;p<=pages;p++){
    items.push(<Pagination.Item key={p} active={p===page} onClick={()=>onChange(p)}>{p}</Pagination.Item>);
  }
  return <Pagination className="justify-content-center mt-3">{items}</Pagination>;
}
