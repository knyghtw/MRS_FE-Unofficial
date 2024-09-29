export default function Modal({ id, title, body }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-gray-100 text-black">
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <div className="py-4">{body}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
