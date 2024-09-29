import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"]})

export const metadata = {
  title: "Manage Product | Admin",
  description: "Salsabila MR Admin Manage Product",
};

export default function ManageProductLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
