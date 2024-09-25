import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"]})

export const metadata = {
  title: "Manage Page | Admin",
  description: "Salsabila MR Admin Manage Page",
};

export default function ManagePageLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
