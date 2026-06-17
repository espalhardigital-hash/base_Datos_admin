import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const Placeholder = ({ name }: { name: string }) => <div className="p-8 text-xl font-bold">Módulo {name} Cargado</div>;
const Layout = ({ children }: { children: React.ReactNode }) => <div className="p-4 bg-slate-50 min-h-screen">{children}</div>;

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div className="p-8"><h1 className="text-2xl font-bold">Login Page</h1></div>} />
        <Route path="/" element={<ProtectedRoute><Layout><Placeholder name="Dashboard Principal" /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};