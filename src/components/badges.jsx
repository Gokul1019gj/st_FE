export const StatusBadge = ({ value }) => {
  const map = { "pending":"secondary", "in-progress":"warning", "completed":"success" };
  return <span className={`badge text-bg-${map[value]||"secondary"}`}>{value?.replace("-"," ")}</span>;
}
export const PriorityBadge = ({ value }) => {
  const map = { low:"secondary", medium:"info", high:"danger" };
  return <span className={`badge text-bg-${map[value]||"secondary"}`}>{value}</span>;
}
