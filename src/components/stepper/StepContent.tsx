import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface StepContentProps {
  children: ReactNode;
  stepIndex: number;
  currentStep: number;
}

export function StepContent({
  children,
  stepIndex,
  currentStep,
}: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      {stepIndex === currentStep && (
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
