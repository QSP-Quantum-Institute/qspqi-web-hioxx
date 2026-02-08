import { motion, AnimatePresence } from "framer-motion";
import { useStepperStore } from "../../stores";
import { StepContent } from "./StepContent";
import type { StepperStep } from "../../common/types/stepper";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils";

interface StepperContainerProps {
  steps: StepperStep[];
  onComplete?: () => void;
}

export function StepperContainer({
  steps,
  onComplete,
}: StepperContainerProps) {
  const {
    currentStep,
    nextStep,
    validateStep,
    errors,
    data,
  } = useStepperStore();

  const canGoNext = () => {
    if (currentStep === 0) {
      return data.fullName.trim().length > 0 && !errors.fullName;
    }
    if (currentStep === 1) {
      return data.birthDate !== null && !errors.birthDate;
    }
    return false;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep)) {
        nextStep();
      }
    } else {
      onComplete?.();
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
            <StepContent
              stepIndex={currentStep}
              currentStep={currentStep}
            >
              {(() => {
                const CurrentStepComponent = steps[currentStep].component;
                return <CurrentStepComponent />;
              })()}
            </StepContent>

            {/* Minimalist button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: canGoNext() ? 1 : 0.3 }}
              transition={{ delay: 0.2 }}
              onClick={handleNext}
              disabled={!canGoNext()}
              className={cn(
                "mt-8",
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
