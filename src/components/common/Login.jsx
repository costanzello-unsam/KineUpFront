import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logocortado from "../../assets/logo cortado.png";
import { httpClient } from "../../api/httpClient.js";
import AnimatedBackground from "../layout/AnimatedBackground.jsx";
import { useAuth } from "../../auth/AuthContext";
import { useSearchParams } from "react-router-dom";
import GoogleLoginButton from "./GoogleLogin.jsx";

function Login() {
  const { user, login, loadingAuth } = useAuth();

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (loadingAuth) return;

    if (user) {
      if (returnUrl) navigate(returnUrl, { replace: true });
      else if (user.roles.includes("Admin")) navigate("/admin/home", { replace: true });
      else if (user.roles.includes("Profesional")) navigate("/profesional/home", { replace: true });
      else if (user.roles.includes("Paciente")) navigate("/paciente/home", { replace: true });
    }
  }, [user, loadingAuth, returnUrl, navigate]);

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const data = await httpClient.post("/api/Auth/login", {
        usuario,
        password,
      });

      const roles = data?.userData?.roles ?? [];

      if (!data?.token || !roles.length) {
        setError("Credenciales inválidas.");
        return;
      }

      login(data);

      if (returnUrl) {
        navigate(returnUrl, { replace: true });
        return;
      }

      if (roles.includes("Admin")) navigate("/admin/home", { replace: true });
      else if (roles.includes("Profesional")) navigate("/profesional/home", { replace: true });
      else if (roles.includes("Paciente")) navigate("/paciente/home", { replace: true });
      else navigate("/sin-acceso", { replace: true });

    } catch (err) {

      console.error(err);

      setError("Sin conexión con el servidor.");
    }
  };

  const handleGoogleLogin = async (Token) => {
    setError("");

    console.log("Google Token:", Token);

    try {
      const data = await httpClient.post("/api/Auth/google/paciente", {
        Token: Token,
      });

      const roles = data?.userData?.roles ?? [];

      if (!data?.token || !roles.length) {
        setError("No se pudo iniciar sesión con Google.");
        return;
      }

      login(data);

      if (returnUrl) navigate(returnUrl, { replace: true });
      else if (roles.includes("Admin")) navigate("/admin/home", { replace: true });
      else if (roles.includes("Profesional")) navigate("/profesional/home", { replace: true });
      else if (roles.includes("Paciente")) navigate("/paciente/home", { replace: true });
      else navigate("/sin-acceso", { replace: true });

    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión con Google.");
    }
  };

  return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-poppins">
    <AnimatedBackground
      bgColor="#f0fdf4"
      color1="#bbf7d0"
      color2="#86efac"
      color3="#4ade80"
      color4="#22c55e"
      speed={3}
    />

    <div className="relative z-10 w-full max-w-[1250px] px-8">
      <div className="grid lg:grid-cols-[1.45fr_1fr] gap-8 items-stretch">

        {/* =======================
            TARJETA IZQUIERDA
        ======================= */}

        <div
          className="
            bg-white/90
            backdrop-blur-md
            rounded-[36px]
            shadow-2xl
            border
            border-white/60
            px-10
            py-6
            flex
            flex-col
            justify-center
          "
        >
          <div className="flex items-center gap-5 mb-8">

            <img
            src={logocortado}
            alt="KineUp"
            className="h-20 w-auto object-contain"
          />

            <div>
              <h1 className="text-6xl font-bold tracking-tight">
                <span className="text-[#007A3F]">
                  Kine
                </span>

                <span className="text-[#3B82F6]">
                  Up
                </span>
              </h1>
            </div>

          </div>

          <span className="uppercase tracking-[7px] text-[#007A3F] font-semibold text-sm">
            PROFESIONALES Y PACIENTES
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-[#12352A] leading-[1.05]">
            Tu recuperación
            <br />
            merece acompañamiento.
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
            KineUp conecta profesionales y pacientes en una misma plataforma.
            Gestioná ejercicios, seguí la evolución clínica y mantené una
            comunicación continua durante todo el proceso de rehabilitación.
          </p>

                <div className="mt-8 flex flex-wrap gap-3">

            <div className="bg-[#E7F7EF] text-[#007A3F] px-4 py-3 rounded-2xl text-sm font-semibold border border-[#B7E4CB]">
              Seguimiento personalizado
            </div>

            <div className="bg-[#E7F7EF] text-[#007A3F] px-4 py-3 rounded-2xl text-sm font-semibold border border-[#B7E4CB]">
              Vinculación mediante QR
            </div>

            <div className="bg-[#E7F7EF] text-[#007A3F] px-4 py-3 rounded-2xl text-sm font-semibold border border-[#B7E4CB]">
              Evolución clínica
            </div>

            </div>
          <div className="mt-10">

            <h3 className="uppercase tracking-[4px] text-[#007A3F] font-semibold text-base mb-8">
              ¿Cómo funciona?
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-5">
                <div className="w-8 h-8 rounded-full bg-[#007A3F] text-white flex items-center justify-center font-bold">
                  1
                </div>

                <p className="text-lg text-slate-700">
                  Creá tu cuenta como paciente o profesional.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full bg-[#007A3F] text-white flex items-center justify-center font-bold">
                  2
                </div>

                <p className="text-lg text-slate-700">
                  Vinculá pacientes mediante QR de manera rápida.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full bg-[#007A3F] text-white flex items-center justify-center font-bold">
                  3
                </div>

                <p className="text-lg text-slate-700">
                  Registrá ejercicios, avances y objetivos terapéuticos.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full bg-[#007A3F] text-white flex items-center justify-center font-bold">
                  4
                </div>

                <p className="text-lg text-slate-700">
                  Monitoreá el progreso y acompañá cada etapa de recuperación.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =======================
            TARJETA LOGIN
        ======================= */}

        <div className="flex justify-center">

          <div
            className="
              bg-white/95
              backdrop-blur-md
              rounded-[36px]
              shadow-2xl
              border
              border-white/60
              w-full
              max-w-[450px]
              px-10
              py-8
              flex
              flex-col
              justify-center
            "
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-[#007A3F] font-semibold text-sm mb-6">
              Profesionales y pacientes
            </div>

            <h2 className="text-6xl font-bold text-[#12352A] leading-[1.05]">
              Bienvenido a
              <br />
              KineUp
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              Ingresá a tu cuenta y continuá tu seguimiento.
            </p>

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form
              className="flex flex-col gap-5 mt-8"
              onSubmit={handleLogin}
            >

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Usuario
                </label>

                <input
                  type="text"
                  placeholder="Usuario o correo"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="
                    w-full
                    h-12
                    rounded-[24px]
                    border
                    border-slate-200
                    px-6
                    text-lg
                    focus:outline-none
                    focus:border-[#007A3F]
                    focus:ring-4
                    focus:ring-green-100
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Contraseña
                </label>

                <input
                  type="password"
                  placeholder="Ingresá tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    h-16
                    rounded-[24px]
                    border
                    border-slate-200
                    px-6
                    text-lg
                    focus:outline-none
                    focus:border-[#007A3F]
                    focus:ring-4
                    focus:ring-green-100
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  h-16
                  rounded-[28px]
                  bg-[#007A3F]
                  hover:bg-[#006432]
                  text-white
                  font-semibold
                  text-xl
                  transition-all
                  shadow-lg
                "
              >
                Iniciar sesión
              </button>

            </form>

            <div className="flex items-center my-8">

              <div className="flex-1 border-t border-slate-200"></div>

              <span className="px-4 text-xs uppercase tracking-wider text-slate-400">
                o continuá con
              </span>

              <div className="flex-1 border-t border-slate-200"></div>

            </div>

            <GoogleLoginButton onSuccess={handleGoogleLogin} />

            <div className="text-center mt-8">

              <span className="text-slate-500">
                ¿No tenés cuenta?
              </span>

              <button
                type="button"
                onClick={() => navigate("/registrar-paciente")}
                className="ml-2 text-[#007A3F] font-semibold hover:underline"
              >
                Crear cuenta
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
);
};

export default Login;
