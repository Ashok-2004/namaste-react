import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import UserContext from './utils/UserContext';

const AppLayout = () => {
  const [userName,setUserName]=useState("Default User")
  useEffect(()=>{
    const User={
      user:"Akshay Saini"
    }
    setUserName(User.user)
  },[])
  return (
    <UserContext.Provider value={{user:userName,setUserName}}>
    <div className="app">
      <Header />  
      <div className="main-content">
        <Outlet />
      </div>
    </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />
      },
      {
        path: "/cart",
        element: <Cart showFullCart={true} />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
  </React.StrictMode>
);

export default AppLayout;