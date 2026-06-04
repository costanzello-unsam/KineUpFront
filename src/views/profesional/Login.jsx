import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Activity, Users, QrCode } from "lucide-react";
import AnimatedBackground from "../../components/layout/AnimatedBackground.jsx";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const urlLogin = "http://192.168.1.101:5000/api/Auth/login";

    try {
      const response = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log("Login exitoso", data);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error en el fetch:", err);
      setError("Sin conexión con el servidor. Verifica tu red.");
    }
  };

  return (
  <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center p-6">

    <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">

      {/* IZQUIERDA */}
      <div className="px-4">

        <img
          src={logo}
          alt="KineUp"
          className="h-16 mb-10"
        />

        <p className="uppercase tracking-[5px] text-[#0A8F4D] font-semibold text-sm mb-6">
          PROFESIONALES Y PACIENTES
        </p>

        <h1 className="text-6xl lg:text-7xl font-bold leading-[1.05] text-[#12352A]">
          Recuperá el
          <br />
          movimiento.
        </h1>

        <h2 className="text-6xl lg:text-7xl font-bold leading-[1.05] text-[#0A8F4D]">
          Acompañá
          <br />
          cada avance.
        </h2>

        <p className="mt-8 text-xl text-slate-600 max-w-xl leading-relaxed">
          Una única plataforma para conectar profesionales
          y pacientes durante todo el proceso de rehabilitación.
        </p>

        {/* Ilustración placeholder */}
        <div className="mt-14 bg-white rounded-3xl p-8 shadow-sm border border-green-100">

          <div className="grid gap-6">

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <Users size={24} className="text-[#0A8F4D]" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Conexión profesional-paciente
                </h3>

                <p className="text-slate-500 text-sm">
                  Seguimiento compartido en tiempo real.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <QrCode size={24} className="text-[#0A8F4D]" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Vinculación mediante QR
                </h3>

                <p className="text-slate-500 text-sm">
                  Acceso rápido y sin configuraciones complejas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <Activity size={24} className="text-[#0A8F4D]" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Evolución organizada
                </h3>

                <p className="text-slate-500 text-sm">
                  Visualizá avances y tratamientos.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* DERECHA */}
      <div className="flex justify-center">

        <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-xl border border-slate-100">

          <div className="text-center mb-8">

            <img
              src={logo}
              alt="KineUp"
              className="h-10 mx-auto mb-5"
            />

            <h2 className="text-4xl font-bold text-[#12352A]">
              Bienvenido
            </h2>

            <p className="text-slate-500 mt-2">
              Ingresá para continuar
            </p>

          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>

              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresá tu usuario"
                required
                className="w-full h-14 rounded-2xl border border-slate-200 px-5 focus:outline-none focus:border-[#0A8F4D] focus:ring-4 focus:ring-green-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-14 rounded-2xl border border-slate-200 px-5 focus:outline-none focus:border-[#0A8F4D] focus:ring-4 focus:ring-green-50"
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-[#0A8F4D] hover:bg-[#08753F] text-white font-semibold text-lg transition-all"
            >
              Iniciar sesión
            </button>

          </form>

          <div className="mt-8 text-center">

            <span className="text-slate-500">
              ¿No tenés cuenta?
            </span>

            <button
              onClick={() => navigate("/register")}
              className="ml-2 text-[#0A8F4D] font-semibold hover:underline"
            >
              Crear cuenta
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;
