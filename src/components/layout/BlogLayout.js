import Footer from "../Footer";
import Navbar from "../Navbar";

export default function BlogLayout({ children }) {
  return (
    <div>
      <Navbar />

      <main >{children}</main>

      <Footer />
    </div>
  );
}
