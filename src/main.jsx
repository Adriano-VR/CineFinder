import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PageSeeAll from './TELAS/PageSeeAll.jsx';
import HomePage from './TELAS/HomePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[{
      path:"/",
      element: <HomePage />
    },{
      
        path: "/see-all/:category", 
        element: <PageSeeAll /> ,
      
    }
  
  
  ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
