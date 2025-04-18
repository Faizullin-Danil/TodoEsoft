import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

const LazyTasksPage = React.lazy(() => import('./pages/TasksPage'));
const LazyAuthPage = React.lazy(() => import('./pages/AuthPage'));


const routes = [
  { path: '/tasks', element: <LazyTasksPage/> },
  { path: '/', element: <LazyAuthPage/> }
];

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={
                    <Suspense fallback={
                      <Box className="flex items-center justify-center w-full h-screen">
                        <CircularProgress sx={{ color: 'black'}}/>
                      </Box>
                      } >
                      {route.element}
                    </Suspense>
                  }/>
              ))}
            </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
};

export default Router;