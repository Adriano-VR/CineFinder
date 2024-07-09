import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import PageSeeAll from './TELAS/PageSeeAll.jsx';
import HomePage from './TELAS/HomePage.jsx';
import Authenticate from "./TELAS/Authenticate.jsx";
import TVSeries from './TELAS/TVSeries.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/filmes" replace />  // Redireciona a URL base para /filmes
  },
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "filmes",
        element: <HomePage />
      },
      {
        path: "/:type/:category",
        element: <PageSeeAll />
      },
      {
        path: "authenticate",
        element: <Authenticate />
      },
      {
        path: "series",
        element: <TVSeries />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
