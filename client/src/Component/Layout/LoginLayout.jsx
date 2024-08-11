import Header from "../Header/HeaderLogin";
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
