import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap"})

export const metadata = {
  title: "Salsabila MR | Privacy Policy",
  description: "Salsabila MR Admin Privacy Policy",
};

export default function PrivacyPolicyLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
