import { useState, useEffect } from "react";
import { useStepperStore } from "../../stores";
import { birthDateSchema } from "../../common/schemas/stepperSchemas";
import { StepTitle } from "../ui/StepTitle";
import { DatePicker } from "../ui/DatePicker";

export function BirthDateStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState(
    data.birthDate || null
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && localValue) {
      const result = birthDateSchema.safeParse(localValue);
      if (!result.success) {
        setError("birthDate", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthDate", null);
        updateData("birthDate", localValue);
      }
    } else if (hasInteracted && !localValue) {
      setError("birthDate", null);
    }
  }, [localValue, hasInteracted, updateData, setError]);

  const handleDateChange = (date: string) => {
    setHasInteracted(true);
    setLocalValue(date);
  };

  const handleBlur = () => {
    if (localValue) {
      const result = birthDateSchema.safeParse(localValue);
      if (!result.success) {
        setError("birthDate", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthDate", null);
        updateData("birthDate", localValue);
      }
    }
  };

  return (
    <div className="w-full">
      <StepTitle color="lightBlue">
        ¿Cuál es tu fecha de nacimiento?
      </StepTitle>

      <DatePicker
        value={localValue}
        onChange={handleDateChange}
        onBlur={handleBlur}
        error={errors.birthDate}
        hasInteracted={hasInteracted}
      />
    </div>
  );
}
