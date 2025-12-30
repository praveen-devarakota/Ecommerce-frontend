import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Navbar from './components/Navbar.jsx';
import SellProduct from './pages/SellProduct.jsx';
import BuyProduct from './pages/BuyProduct.jsx';
import Cart from './pages/Cart.jsx';
import ProductSingle from './pages/ProductSingle.jsx';
import ProfilePage from './pages/Profilepage.jsx';
import Laptops from './pages/Laptops.jsx';
import Mobiles from './pages/Mobiles.jsx';
import Furniture from './pages/Furniture.jsx';
import Books from './pages/Books.jsx';
import Accessories from './pages/Accessories.jsx';
import Sneakers from './pages/Sneakers.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/sellProduct" element={<SellProduct/>} />
        <Route path="/buyProduct" element={<BuyProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/laptops" element={<Laptops/>} />
        <Route path="/mobiles" element={<Mobiles />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/books" element={<Books />} />
        <Route path="/sneakers" element={<Sneakers />} />
      </Routes>
    </>
  );
}

export default App;
