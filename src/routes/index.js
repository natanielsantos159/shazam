import React from "react";
import { useRoutes } from 'react-router-dom'
import App from '../App';
import HistoryPage from '../pages/HistoryPage';
import IdentifyPage from '../pages/IdentifyPage';

export default function Router() {
  return useRoutes([
    {
      path: '/', 
      element: <App />,
      children: [
        { path: '/identify', element: <IdentifyPage /> },
        { path: '/history', element: <HistoryPage /> },
      ]
    }
  ]);
}
