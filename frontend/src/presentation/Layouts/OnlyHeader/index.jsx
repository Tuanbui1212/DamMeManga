import Header from "../../components/Header";

function OnlyHeaderLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default OnlyHeaderLayout;
