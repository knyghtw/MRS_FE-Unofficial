import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | Login Admin",
  description: "Salsabila MR Admin Login Page",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>{children}</main>        
      </body>
    </html>
  );
}
