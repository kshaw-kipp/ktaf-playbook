import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Adoption Community — Manager Playbook | KTAF",
  description: "Community Manager Playbook for the KIPP Team & Family Schools Claude Adoption Slack community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
