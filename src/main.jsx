/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import  { Suspense, lazy } from 'react';

import Authenticate from "./TELAS/AUTHENTICATE/Authenticate.jsx"
import HomePage from "./TELAS/HOME/index.jsx"
import Loader from './COMPONENTS/Loader.jsx';
import Erro404 from "./TELAS/ERRO/Errro404.jsx";

const FilmesCategoria = lazy(() => import('./TELAS/FILMES/FilmesCategoria.jsx'));
const TVSeries = lazy(() => import('./TELAS/SERIES/TVSeries.jsx'));
const PageDetails = lazy(() => import('./TELAS/DETALHES/index.jsx'));

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
        path: "/filmes/:category",
        element: (
          <Suspense fallback={<Loader />}>
            <FilmesCategoria />
          </Suspense>
        ),
      },
      {
        path: "/tv/:category",
        element: (
          <Suspense fallback={<Loader />}>
            <TVSeries />
          </Suspense>
        ),
      },
      {
        path:"tv/:category/details/:id",
        element: (  
          <Suspense fallback={<Loader />}> 
          <PageDetails />
          </Suspense>
        )
      },
      {
        path:"filmes/:category/details/:id",
        element: (
          <Suspense fallback={<Loader />}>
          <PageDetails />
          </Suspense>
        )
      }
    ],
    
  },
  {
    path: "authenticate",
    element: <Authenticate />
  },
  {
    path: "*", 
    element: <Erro404 />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
