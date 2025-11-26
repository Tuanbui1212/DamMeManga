<<<<<<< HEAD
import Header from "../../components/Header";
=======
import Header from "../../components/Header/Header";
>>>>>>> java/phungcuong
import Footer from "../../components/Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
