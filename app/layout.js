import { Fraunces, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"], axes: ["opsz", "SOFT"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Inter_Tight({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata = {
  title: { default: "Ryan Cahalane", template: "%s · Ryan Cahalane" },
  description: "Ryan Cahalane on manufacturing operations and the software sold to them: writing, projects and interactive demos.",
  authors: [{ name: "Ryan Cahalane" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
      </head>
      <body className={`${serif.variable} ${sans.variable} ${display.variable} ${mono.variable} rc antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
