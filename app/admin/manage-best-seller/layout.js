import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"]})

export const metadata = {
  title: "Manage Best Seller | Admin",
  description: "Salsabila MR Admin Manage Best Seller",
};

export default function ManageBestSellerLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
