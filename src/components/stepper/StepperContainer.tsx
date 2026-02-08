import { motion } from "framer-motion";
import { useStepperStore } from "../../stores";
import { StepIndicator } from "./StepIndicator";
import { StepContent } from "./StepContent";
import { StepperNavigation } from "./StepperNavigation";
import type { StepperStep, StepStatus } from "../../common/types/stepper";

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
    previousStep,
    validateStep,
    errors,
  } = useStepperStore();

  const getStepStatus = (index: number): StepStatus => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  const canGoNext = () => {
    if (currentStep === 0) {
      return !errors.fullName && validateStep(0);
    }
    if (currentStep === 1) {
      return !errors.birthDate && validateStep(1);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gold-50/30 to-lightBlue-50/30 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gold-50/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-lightBlue-50/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-50/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12"
      >
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <StepIndicator
              key={step.id}
              step={index}
              status={getStepStatus(index)}
              label={step.label}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] flex items-center justify-center">
          {steps.map((step, index) => (
            <StepContent
              key={step.id}
              stepIndex={index}
              currentStep={currentStep}
            >
              <step.component />
            </StepContent>
          ))}
        </div>

        {/* Navigation */}
        <StepperNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={previousStep}
          onNext={handleNext}
          canGoNext={canGoNext()}
        />
      </motion.div>
    </div>
  );
}
