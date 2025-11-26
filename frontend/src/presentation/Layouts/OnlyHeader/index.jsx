<<<<<<< HEAD
import Header from "../../components/Header";
=======
import Header from "../../components/Header/Header";
>>>>>>> java/phungcuong

function OnlyHeaderLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default OnlyHeaderLayout;
