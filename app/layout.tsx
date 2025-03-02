import "@/assets/styles/globals.css";
export const metadata = {
  title: "Propery Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
