
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Notfound from './Components/Notfound/Notfound';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import AuthProvider from './Context/Authentication';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import UserOrders from './Components/UserOrders/UserOrders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';


function App() {
  let clintQuery = new QueryClient();
  const myRouter = createHashRouter([
    { path: '/', element: <Layout />, children:[
      {index :true, element: <ProtectedRoute><Home /></ProtectedRoute>},
      {path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute>},
      {path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>},
      {path: 'login', element: <Login />},
      {path: 'register', element: <Register />},
      {path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute>},
      {path: 'forgotpassword', element: <ForgotPassword />},
      {path: 'updatepassword', element: <UpdatePassword />},
      {path: 'resetcode', element: <ResetCode />},
      {path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute>},
      {path: 'allorders', element: <ProtectedRoute><UserOrders /></ProtectedRoute>},
      {path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>},
      {path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute>},
      {path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>},
      {path: '*', element: <Notfound />},
    ] }
  ])
  return <>
  <QueryClientProvider client={clintQuery}>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={myRouter} />
      </AuthProvider>
    </CartProvider>
    <Toaster />
  </QueryClientProvider>
  </>
}

export default App;
