import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "NeuroHarmony",
  description: "Building communities for the Neurodiverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}