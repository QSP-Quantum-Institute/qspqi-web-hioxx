import { AnimatePresence, motion } from "framer-motion";
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
  if (stepIndex !== currentStep) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
