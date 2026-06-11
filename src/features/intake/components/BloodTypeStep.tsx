import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../store/stepperStore";
import {
  bloodTypeSchema,
  bloodTypeOtherSchema,
  STANDARD_BLOOD_TYPES,
} from "../schemas/stepperSchemas";
import { StepTitle } from "../../../components/ui/StepTitle";
import { Select } from "../../../components/ui/Select";
import { cn } from "../../../utils/cn";

const bloodTypeOptions = [...STANDARD_BLOOD_TYPES, "OTRA"] as const;

export function BloodTypeStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState<string | "">(
    data.bloodType || ""
  );
  const [localOther, setLocalOther] = useState(data.bloodTypeOther || "");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && localValue !== "") {
      const result = bloodTypeSchema.safeParse(localValue);
      if (!result.success) {
        setError("bloodType", result.error.issues[0]?.message || "Error");
      } else {
        setError("bloodType", null);
        updateData("bloodType", localValue);
        if (localValue !== "OTRA") {
          updateData("bloodTypeOther", null);
          setError("bloodTypeOther", null);
        }
      }
    } else if (hasInteracted && localValue === "") {
      setError("bloodType", null);
    }
  }, [localValue, hasInteracted, updateData, setError]);

  useEffect(() => {
    if (localValue === "OTRA" && hasInteracted) {
      const result = bloodTypeOtherSchema.safeParse(localOther);
      if (!result.success) {
        setError(
          "bloodTypeOther",
          result.error.issues[0]?.message || "Error"
        );
      } else {
        setError("bloodTypeOther", null);
        updateData("bloodTypeOther", localOther);
      }
    }
  }, [localOther, localValue, hasInteracted, updateData, setError]);

  const handleChange = (value: string) => {
    setHasInteracted(true);
    setLocalValue(value);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    setLocalOther(e.target.value);
  };

  return (
    <div className="w-full">
      <StepTitle color="red">¿Cuál es tu tipo de sangre?</StepTitle>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-[200px]">
          <Select
            value={localValue}
            onValueChange={handleChange}
            options={bloodTypeOptions.map((type) => ({
              value: type,
              label: type,
            }))}
            placeholder="Tipo de sangre"
            error={!!errors.bloodType}
            searchable={true}
          />
        </div>

        {localValue === "OTRA" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <input
              type="text"
              value={localOther}
              onChange={handleOtherChange}
              placeholder="Especifica tu tipo de sangre"
              className={cn(
                "w-full px-0 py-3 text-center text-lg",
                "bg-transparent border-0 border-b-2",
                "focus:outline-none transition-all duration-300",
                "placeholder:text-gray-300",
                errors.bloodTypeOther
                  ? "border-red-200/50 text-red-200"
                  : "border-gray-200/50 text-dark/70 focus:border-red/50"
              )}
            />
          </motion.div>
        )}
      </div>

      {errors.bloodType && hasInteracted && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-200/70 text-center"
        >
          {errors.bloodType}
        </motion.p>
      )}

      {errors.bloodTypeOther && hasInteracted && localValue === "OTRA" && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-200/70 text-center"
        >
          {errors.bloodTypeOther}
        </motion.p>
      )}
    </div>
  );
}
