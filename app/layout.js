import { Poppins, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ustaad - AI Tutor Network",
  description: "Pakistan's premier AI-powered home tutoring network",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3500,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              color: "#FFFFFF",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "12px 18px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.4), 0 8px 10px -6px rgba(15, 23, 42, 0.2)",
              fontFamily: "var(--font-poppins), sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#FFFFFF",
              },
              style: {
                border: "1px solid rgba(16, 185, 129, 0.35)",
              },
            },
            error: {
              iconTheme: {
                primary: "#FF4D00",
                secondary: "#FFFFFF",
              },
              style: {
                border: "1px solid rgba(255, 77, 0, 0.35)",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}


