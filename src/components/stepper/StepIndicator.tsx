import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../utils";
import type { StepStatus } from "../../common/types/stepper";

interface StepIndicatorProps {
  step: number;
  status: StepStatus;
  label: string;
  isLast?: boolean;
}

export function StepIndicator({
  step,
  status,
  label,
  isLast = false,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center flex-1">
      <div className="flex flex-col items-center flex-1">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{
              scale: status === "active" ? 1.1 : 1,
              backgroundColor:
                status === "completed"
                  ? "var(--color-gold)"
                  : status === "active"
                    ? "var(--color-gold-200)"
                    : "var(--color-gray-200)",
            }}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
              status === "completed"
                ? "border-gold bg-gold text-white"
                : status === "active"
                  ? "border-gold bg-gold-50 text-gold"
                  : "border-gray-300 bg-white text-gray-400"
            )}
          >
            {status === "completed" ? (
              <Check className="w-6 h-6" />
            ) : (
              <span className="font-semibold">{step + 1}</span>
            )}
          </motion.div>
          {!isLast && (
            <div
              className={cn(
                "absolute left-full w-full h-0.5 transition-colors duration-300",
                status === "completed" ? "bg-gold" : "bg-gray-300"
              )}
              style={{ width: "calc(100% - 3rem)", marginLeft: "1.5rem" }}
            />
          )}
        </div>
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: status === "active" ? 1 : 0.6,
            color:
              status === "active"
                ? "var(--color-gold)"
                : status === "completed"
                  ? "var(--color-gold-300)"
                  : "var(--color-gray-500)",
          }}
          className={cn(
            "mt-2 text-sm font-medium text-center max-w-[120px]",
            status === "active" && "text-gold"
          )}
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}
