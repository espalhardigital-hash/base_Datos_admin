import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";

const loginFormSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(4, "La contraseña es muy corta"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormInput) => {
    setIsLoggingIn(true);
    setLoginError("");
    try {
      await login(data);
    } catch (err: any) {
      setLoginError(err.message || "Credenciales incorrectas");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        
        {/* Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
            <span className="text-3xl font-black">LK</span>
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">LogicaKids Pro</h2>
          <p className="mt-2 text-sm text-slate-500">Panel Administrativo</p>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <p className="font-semibold">{loginError}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Usuario</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><User className="h-5 w-5" /></span>
                <input type="text" disabled={isLoggingIn} className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-indigo-600 focus:bg-white" placeholder="amilcar_admin" {...register("username")} />
              </div>
              {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Lock className="h-5 w-5" /></span>
                <input type="password" disabled={isLoggingIn} className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-indigo-600 focus:bg-white" placeholder="••••••••" {...register("password")} />
              </div>
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>

          </div>

          <button type="submit" disabled={isLoggingIn} className="flex w-full justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-700">
            {isLoggingIn ? <><Loader2 className="h-5 w-5 animate-spin" /> Conectando...</> : "Ingresar al Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
};
