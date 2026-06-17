import React, { useState, useEffect } from "react";
import { changeApiBaseUrl } from "../../../api/apiClient";

export const ConfiguracionPage: React.FC = () => {
  const [apiEndpoint, setApiEndpoint] = useState("");

  useEffect(() => {
    const activeUrl = localStorage.getItem("logicakids_api_url") || "https://db.espalhar.shop/api";
    setApiEndpoint(activeUrl.replace("/api", ""));
  }, []);

  const handleSaveEndpoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm("¿Mudar el backend? La app se reiniciará inmediatamente.")) {
      changeApiBaseUrl(apiEndpoint);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl border shadow-sm">
      <h2 className="text-xl font-black mb-4">1. Endpoints Principales [Mudar Servidor]</h2>
      <form onSubmit={handleSaveEndpoints} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Endpoint del Backend (Esta API)</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded mt-1 font-mono" 
            value={apiEndpoint} 
            onChange={e => setApiEndpoint(e.target.value)} 
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl">Aplicar y Reiniciar</button>
      </form>
    </div>
  );
};