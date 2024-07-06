import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PageSeeAll from './TELAS/PageSeeAll.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/see-all/:category", 
    element: <PageSeeAll /> ,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
