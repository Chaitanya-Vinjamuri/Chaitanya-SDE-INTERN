import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";


// this is app
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<ProductsPage />}
        />
        <Route
  path="/edit/:id"
  element={<EditProductPage />}
/>

        <Route
          path="/add"
          element={<AddProductPage />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;