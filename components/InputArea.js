import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function InputArea({ value, onChange, classname }) {
  return (
    <ReactQuill
      className={`h-full w-full bg-white text-black my-2 ${classname}`}
      value={value}
      onChange={onChange}
    />
  );
}
