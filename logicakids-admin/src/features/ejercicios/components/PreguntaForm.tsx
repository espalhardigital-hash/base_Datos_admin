import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preguntaSchema, PreguntaInput } from "../schemas/preguntaSchema";
import { OperacionEnum, TipoPreguntaEnum } from "../../../types/db-enums";

export const PreguntaForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { register, control, handleSubmit, setValue, watch, reset } = useForm<PreguntaInput>({
    resolver: zodResolver(preguntaSchema),
    defaultValues: { operacion: OperacionEnum.SUMA, tipo_pregunta: TipoPreguntaEnum.MULTIPLE_OPCION, alternativas: [] }
  });

  const onSubmit = async (data: PreguntaInput) => {
    console.log("Enviando a API...", data);
    alert("¡Pregunta Guardada!");
    reset(); onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-xl dark:bg-slate-900 dark:text-white">
        <h3 className="text-xl font-black mb-4">Nueva Pregunta</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Fase" className="border p-2 rounded" {...register("fase_id", {valueAsNumber: true})} />
            <input type="text" placeholder="Enunciado" className="border p-2 rounded" {...register("enunciado")} />
            <input type="text" placeholder="Respuesta Correcta" className="border p-2 rounded" {...register("respuesta_correcta")} />
          </div>

          {/* EDITOR HÍBRIDO MINIO / SVG */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase text-indigo-600">Apoyo Visual (JSONB)</label>
              <select className="text-xs p-1 rounded" onChange={(e) => {
                const val = e.target.value;
                if (!val) setValue("datos_numericos", null);
                if (val === "imagen") setValue("datos_numericos", { visual_support: { tipo: "imagen", url: "" } });
                if (val === "geometria") setValue("datos_numericos", { visual_support: { tipo: "geometria", figura: "triangulo", base: 120, altura: 100, color: "#6366f1" } });
              }}>
                <option value="">Solo Texto</option>
                <option value="imagen">Subir Imagen (MinIO)</option>
                <option value="geometria">Figura SVG (Geometría)</option>
              </select>
            </div>

            {watch("datos_numericos")?.visual_support?.tipo === "imagen" && (
              <input type="text" placeholder="URL de MinIO" className="w-full border p-2 rounded text-sm" {...register("datos_numericos.visual_support.url")} />
            )}

            {watch("datos_numericos")?.visual_support?.tipo === "geometria" && (
              <div className="grid grid-cols-4 gap-2">
                <select className="border p-2 rounded text-sm" {...register("datos_numericos.visual_support.figura")}>
                  <option value="triangulo">Triángulo</option><option value="rectangulo">Rectángulo</option><option value="circulo">Círculo</option>
                </select>
                <input type="number" placeholder="Base" className="border p-2 rounded text-sm" {...register("datos_numericos.visual_support.base", {valueAsNumber: true})} />
                <input type="number" placeholder="Altura" className="border p-2 rounded text-sm" {...register("datos_numericos.visual_support.altura", {valueAsNumber: true})} />
                <input type="color" className="border rounded h-full w-full" {...register("datos_numericos.visual_support.color")} />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-xl">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};