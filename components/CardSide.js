export default function CardSide({ classname, hidden, children }) {
  return (
    <div
      className={`card ${classname} bg-gray-100 text-stone-700 ${
        hidden ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
