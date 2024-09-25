import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"]})

export const metadata = {
  title: "Manage Jumbotron | Admin",
  description: "Salsabila MR Admin Manage Jumbotron",
};

export default function ManageContactUsLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
