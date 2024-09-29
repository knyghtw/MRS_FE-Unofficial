import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | About Us",
  description: "Salsabila MR Admin About Us",
};

export default function BestSellerLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
