import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | T&C",
  description: "Salsabila MR Privacy Policy",
};

export default function TermAndConditionLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
