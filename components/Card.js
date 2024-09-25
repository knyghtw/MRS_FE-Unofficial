export default function Card({ classname, hidden, children }) {
  return (
    <div className={`card ${classname} ${hidden ? "hidden" : ""}`}>
      <div className="card-body p-5">{children}</div>
    </div>
  );
}
