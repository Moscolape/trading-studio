import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex h-screen">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
