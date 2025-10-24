import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import { Bounce, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LibraryManager",
  description: "It is an cool Library manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
         
                    <ToastContainer
                 position="top-right"
                 autoClose={2000}
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick={false}
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover={false}
                 theme="light"
                 transition={Bounce}
               />
        {children}
      </body>
    </html>
  );
}
