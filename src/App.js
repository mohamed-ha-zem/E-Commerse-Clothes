import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/header';
import Home from './pages/website/home';
import About from './pages/website/about';
import Register from './pages/website/Auth/register';
import DashBoard from './pages/dashBoard/dashBoard';
import Users from './pages/dashBoard/Users/users';
import CreateUser from './pages/dashBoard/Users/createUser';
import Products from './pages/dashBoard/Products/products';
import CreateProduct from './pages/dashBoard/Products/createProduct';
import Login from './pages/website/Auth/login';
import PersistLogin from './pages/website/Auth/PersistLogin';
import RequiredAuth from './pages/website/Auth/RequiredAuth';
import UpdateUser from './pages/dashBoard/Users/updateUser';
import UpdateProducts from './pages/dashBoard/Products/updateProduct';
import UpdateProduct from './pages/dashBoard/Products/updateProduct';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Header/>}/>
      <Route path='/home' element={
        <div>
          <Header/>
          <Home/>
        </div>
      }/>
      <Route path='/about' element={
        <div>
          <Header/>
          <About/>
        </div>
      }/>
      <Route path='/register' element={
        <div>
          <Header/>
          <Register/>
        </div>
      }/>
      <Route path='/Login' element={
        <div>
          <Header/>
          <Login/>
        </div>
      }/>
      <Route element={<PersistLogin/>}>
        <Route element={<RequiredAuth/>}>
          <Route path='/dashBoard' element={<DashBoard/>}>
            <Route path='users' element={<Users/>}/>
            <Route path='user/create' element={<CreateUser/>}/>
            <Route path='users/:id' element={<UpdateUser/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='product/create' element={<CreateProduct/>}/>
            <Route path='products/:id' element={<UpdateProduct/>}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
