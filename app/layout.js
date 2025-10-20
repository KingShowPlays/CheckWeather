import Header from "@/components/Header";
import "./globals.css";
import { StateContextProvider } from "@/context/requestContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Weather App",
  description: "A platform for checking the weather",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StateContextProvider>
          <Header />
          {children}
          <Footer />
        </StateContextProvider>
      </body>
    </html>
  );
}
