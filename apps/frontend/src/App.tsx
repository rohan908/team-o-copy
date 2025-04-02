import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MapPage from './routes/MapPage/MapPage.tsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <MapPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
