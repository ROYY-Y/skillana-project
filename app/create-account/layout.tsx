import "@/app/globals.css";
import Navbar from "../_global_components/authen_pages/login_nav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
        <Navbar></Navbar>
        {children}
        </body>
    </html>
  );
}
