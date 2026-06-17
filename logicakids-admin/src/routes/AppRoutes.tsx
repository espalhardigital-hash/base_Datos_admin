import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../features/auth/pages/LoginPage";

const Placeholder = ({ name }: { name: string }) => <div className="p-8 text-xl font-bold">Módulo {name} Cargado</div>;
const Layout = ({ children }: { children: React.ReactNode }) => <div className="p-4 bg-slate-50 min-h-screen">{children}</div>;

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AQUI CONECTAMOS LA PÁGINA REAL */}
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ProtectedRoute><Layout><Placeholder name="Dashboard Principal" /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};