import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHioxxSessionStore } from "../../stores/hioxxSessionStore";
import { getAllModules } from "../calculations/core/registry";
import { AppRoutes } from "../../common/enums";
import { cn } from "../../utils/cn";
import type { CalculationType } from "../calculations/core/types";

export function CalculationSelectPage() {
  const navigate = useNavigate();
  const { setSelectedCalculation } = useHioxxSessionStore();
  const modules = getAllModules();

  const handleSelect = (type: CalculationType, status: string) => {
    if (status !== "active") return;
    setSelectedCalculation(type);
    navigate(`${AppRoutes.CALCULATION}/${type}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(244,232,193,0.35) 50%, rgba(230,242,255,0.35) 100%)",
      }}
    >
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl text-center text-dark/80 font-light step-title-font mb-2">
            Tipo de cálculo
          </h1>
          <p className="text-center text-gray-400 font-light mb-10">
            Selecciona el tipo de cálculo que deseas realizar
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((mod, index) => {
              const isActive = mod.status === "active";
              return (
                <motion.button
                  key={mod.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleSelect(mod.type, mod.status)}
                  disabled={!isActive}
                  className={cn(
                    "relative p-6 rounded-xl text-left transition-all duration-300",
                    "border",
                    isActive
                      ? "bg-white/60 border-gold/30 hover:bg-gold/5 hover:border-gold/50 cursor-pointer"
                      : "bg-gray-50/50 border-gray-200/30 cursor-not-allowed opacity-60"
                  )}
                >
                  {!isActive && (
                    <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-gray-200/50 text-gray-500 font-light">
                      Próximamente
                    </span>
                  )}
                  <h3 className="text-lg text-dark/70 font-light mb-2">
                    {mod.label}
                  </h3>
                  <p className="text-sm text-gray-400 font-light">
                    {mod.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(AppRoutes.SUMMARY)}
              className="text-sm text-gray-400 hover:text-gray-600 font-light transition-colors cursor-pointer"
            >
              Volver al resumen
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
