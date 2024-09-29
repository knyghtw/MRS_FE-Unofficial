import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | Product",
  description: "Salsabila MR Product",
};

export default function ProductLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
