import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useStepperStore } from "../store/stepperStore";
import { INTAKE_STEPS } from "../config/steps";
import { StepContent } from "./StepContent";
import type { StepperStep } from "../types/stepper";
import { cn } from "../../../utils/cn";

interface StepperContainerProps {
  steps: StepperStep[];
  onComplete?: () => void;
}

export function StepperContainer({ steps, onComplete }: StepperContainerProps) {
  const { currentStep, nextStep, previousStep, validateStep, errors, data } =
    useStepperStore();

  const stepConfig = INTAKE_STEPS[currentStep];

  const canGoNext = () => {
    if (!stepConfig) return false;
    return stepConfig.canProceed(data, errors);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep)) {
        nextStep();
      }
    } else {
      if (validateStep(currentStep)) {
        onComplete?.();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canGoNext()) {
      handleNext();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(244,232,193,0.35) 50%, rgba(230,242,255,0.35) 100%)",
      }}
      onKeyDown={handleKeyPress}
    >
      <div className="w-full max-w-4xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <StepContent stepIndex={currentStep} currentStep={currentStep}>
              {(() => {
                const CurrentStepComponent = steps[currentStep].component;
                return <CurrentStepComponent />;
              })()}
            </StepContent>

            <div className="mt-8 flex items-center gap-4">
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={previousStep}
                  className={cn(
                    "flex items-center justify-center",
                    "w-12 h-12",
                    "rounded-full",
                    "bg-gray-200/50 hover:bg-gray-300/50 text-gray-600",
                    "transition-all duration-300",
                    "cursor-pointer"
                  )}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: canGoNext() ? 1 : 0.3 }}
                transition={{ delay: 0.2 }}
                onClick={handleNext}
                disabled={!canGoNext()}
                className={cn(
                  "flex items-center justify-center",
                  "w-12 h-12",
                  "rounded-full",
                  "transition-all duration-300",
                  canGoNext()
                    ? "bg-gold/20 hover:bg-gold/30 text-gold cursor-pointer"
                    : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
                )}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
