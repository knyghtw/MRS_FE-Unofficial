import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function NotFound() {
  return (
    <div className={`min-h-screen text-primary bg-gray-100 ${montserrat.className}`}>
      <div className="flex flex-row min-h-screen justify-center items-center font-bold text-xl">Error 404 : Page Not Found</div>
    </div>
  );
}
