import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useHioxxSessionStore } from "../../stores/hioxxSessionStore";
import { useStepperStore } from "../../features/intake/store/stepperStore";
import { getModule } from "../../features/calculations/core/registry";
import { AppRoutes } from "../../common/enums";
import type { CalculationType, HioxxProfile } from "../../features/calculations/core/types";
import { cn } from "../../utils/cn";

export function ResultsPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const { profile, resetSession } = useHioxxSessionStore();
  const { reset: resetStepper } = useStepperStore();

  const module = getModule(type as CalculationType);

  const result = useMemo(() => {
    if (!module || !profile.fullName) return null;
    return module.calculate(profile as HioxxProfile);
  }, [module, profile]);

  if (!module || !result) return null;

  const ResultsView = module.ResultsView;

  const handleNewCalculation = () => {
    navigate(AppRoutes.CALCULATION_SELECT);
  };

  const handleRestart = () => {
    resetSession();
    resetStepper();
    navigate(AppRoutes.HOME);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(244,232,193,0.35) 50%, rgba(230,242,255,0.35) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <ResultsView result={result} profile={profile as HioxxProfile} />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleNewCalculation}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-light",
              "border border-gray-200/50 text-gray-500",
              "hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            )}
          >
            Nuevo cálculo
          </button>
          <button
            onClick={handleRestart}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-light",
              "bg-gold/20 hover:bg-gold/30 text-gold",
              "transition-all duration-300 cursor-pointer"
            )}
          >
            Reiniciar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
