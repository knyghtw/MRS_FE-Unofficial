import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | Login",
  description: "Salsabila MR Login Page",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
