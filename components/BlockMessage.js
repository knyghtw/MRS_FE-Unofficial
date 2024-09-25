export default function BlockMessage({ title, body, className }) {
  return (
    <div className={`absolute top-64 left-28 w-1/2 z-50 text-white ${className}`}>
      <p className="font-playfair font-bold text-6xl">{title}</p>
      <p className="text-xl mt-8">{body}</p>
    </div>
  );
}
