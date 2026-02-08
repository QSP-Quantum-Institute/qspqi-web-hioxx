import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useStepperStore } from "../../stores";
import { birthDateSchema } from "../../common/schemas/stepperSchemas";
import { cn } from "../../utils";

export function BirthDateStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState(
    data.birthDate || ""
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && localValue.length > 0) {
      const result = birthDateSchema.safeParse(localValue);
      if (!result.success) {
        setError("birthDate", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthDate", null);
        updateData("birthDate", localValue);
      }
    } else if (hasInteracted && localValue.length === 0) {
      setError("birthDate", null);
    }
  }, [localValue, hasInteracted, updateData, setError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    if (localValue.length > 0) {
      const result = birthDateSchema.safeParse(localValue);
      if (!result.success) {
        setError("birthDate", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthDate", null);
        updateData("birthDate", localValue);
      }
    }
  };

  const maxDate = dayjs().format("YYYY-MM-DD");
  const minDate = dayjs().subtract(120, "years").format("YYYY-MM-DD");

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-light text-dark/80 mb-4">
          ¿Cuál es tu fecha de nacimiento?
        </h2>
      </motion.div>

      <div className="relative">
        <input
          type="date"
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={minDate}
          max={maxDate}
          autoFocus
          className={cn(
            "w-full",
            "px-0 py-4",
            "text-2xl md:text-3xl",
            "text-center",
            "bg-transparent",
            "border-0",
            "border-b-2",
            "focus:outline-none",
            "transition-all duration-300",
            "[color-scheme:light]",
            errors.birthDate
              ? "border-red-200/50 text-red-200"
              : "border-gray-200/50 text-dark/70 focus:border-gold/50"
          )}
        />
      </div>

      {errors.birthDate && hasInteracted && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-200/70 text-center"
        >
          {errors.birthDate}
        </motion.p>
      )}
    </div>
  );
}
