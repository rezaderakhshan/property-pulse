import "@/assets/styles/globals.css";
import AuthProvider from "@/components/auth-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MessageProvider from "@/context/message-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
export const metadata = {
  title: "Propery Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};
import "photoswipe/dist/photoswipe.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <MessageProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessageProvider>
    </AuthProvider>
  );
};

export default Layout;
