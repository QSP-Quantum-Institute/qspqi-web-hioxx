import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../utils";

interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isLoading?: boolean;
}

export function StepperNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoNext,
  isLoading = false,
}: StepperNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className={cn(
          "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
          isFirstStep || isLoading
            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gold hover:text-gold"
        )}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Atrás</span>
      </motion.button>

      <div className="flex-1" />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!canGoNext || isLoading}
        className={cn(
          "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
          !canGoNext || isLoading
            ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-gradient-to-r from-gold to-gold-300 text-white shadow-lg hover:shadow-xl"
        )}
      >
        <span>{isLastStep ? "Completar" : "Continuar"}</span>
        {!isLastStep && <ArrowRight className="w-4 h-4" />}
      </motion.button>
    </div>
  );
}
