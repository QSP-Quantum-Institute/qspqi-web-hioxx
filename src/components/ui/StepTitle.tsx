import { motion } from "framer-motion";
import { cn } from "../../utils";

interface StepTitleProps {
  children: React.ReactNode;
  className?: string;
  color?: "gold" | "lightBlue" | "green" | "red" | "dark";
}

export function StepTitle({
  children,
  className,
  color = "dark",
}: StepTitleProps) {
  const colorClasses = {
    gold: "text-gold",
    lightBlue: "text-lightBlue-200",
    green: "text-green-200",
    red: "text-red-200",
    dark: "text-dark/80",
  };

  return (
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "text-4xl md:text-6xl lg:text-7xl",
        "font-light",
        "tracking-wide",
        "text-center",
        "mb-12",
        "step-title-font",
        colorClasses[color],
        className
      )}
    >
      {children}
    </motion.h2>
  );
}
