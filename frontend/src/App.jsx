import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DefaultLayout from "./presentation/Layouts/DefaultLayout";
import { publicRoutes, privateRoutes } from "./presentation/routes";
import AdminRoute from "./presentation/routes/AdminRoute";
import ErrorBoundary from "./presentation/components/ErrorBoundary/ErrorBoundary";

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-3 bg-gray-950 text-gray-300">
      <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium tracking-wide">Đang tải trang...</span>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    // resetKey = pathname: khi chuyển trang, lỗi cũ (nếu có) sẽ được xoá
    <ErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ROUTE CÔNG KHAI */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout ?? DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* ROUTE RIÊNG TƯ (bọc AdminRoute) */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout ?? DefaultLayout;

            return (
              <Route
                key={`admin-${index}`}
                path={route.path}
                element={
                  <AdminRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </AdminRoute>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
