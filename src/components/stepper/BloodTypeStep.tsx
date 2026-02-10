import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../../stores";
import { bloodTypeSchema } from "../../common/schemas/stepperSchemas";
import { StepTitle } from "../ui/StepTitle";
import { Select } from "../ui/Select";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function BloodTypeStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState<string | "">(
    data.bloodType || ""
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && localValue !== "") {
      const result = bloodTypeSchema.safeParse(localValue);
      if (!result.success) {
        setError("bloodType", result.error.issues[0]?.message || "Error");
      } else {
        setError("bloodType", null);
        updateData("bloodType", localValue);
      }
    } else if (hasInteracted && localValue === "") {
      setError("bloodType", null);
    }
  }, [localValue, hasInteracted, updateData, setError]);

  const handleChange = (value: string) => {
    setHasInteracted(true);
    setLocalValue(value);
  };

  return (
    <div className="w-full">
      <StepTitle color="red">¿Cuál es tu tipo de sangre?</StepTitle>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-[200px]">
          <Select
            value={localValue}
            onValueChange={handleChange}
            options={bloodTypes.map((type) => ({ value: type, label: type }))}
            placeholder="Tipo de sangre"
            error={!!errors.bloodType}
            searchable={true}
          />
        </div>
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
    </div>
  );
}
