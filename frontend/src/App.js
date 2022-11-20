// import { Profile, Account, MyOrders, Cart, TrackOrders, HomePage, Product, Wishlist,ResetPassword} from "./Pages/index";
import {Footer,NavBar} from './Components/index'
import RouteImport from "./RouteImport"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <RouteImport/>

      <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <Footer />
    </>
  );
}

export default App;
