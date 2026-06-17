import React, { useState, useEffect } from "react";
export const AlumnosTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [alumnos, setAlumnos] = useState([]); // Simulación
  const isLoading = false;

  // FIX: Regresar a la página anterior si borras a todos los de la página actual
  useEffect(() => {
    if (!isLoading && alumnos.length === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [alumnos.length, isLoading, page]);

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow border">
      <h2 className="text-xl font-black mb-4">Tabla de Alumnos (Pág. {page})</h2>
      <div className="flex gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="bg-slate-100 px-4 py-2 rounded">Ant</button>
        <button onClick={() => setPage(p => p + 1)} className="bg-slate-100 px-4 py-2 rounded">Sig</button>
      </div>
    </div>
  );
};