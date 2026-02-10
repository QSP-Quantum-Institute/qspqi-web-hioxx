import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStepperStore } from "../../stores";
import { birthTimeSchema } from "../../common/schemas/stepperSchemas";
import { StepTitle } from "../ui/StepTitle";
import { Select } from "../ui/Select";

export function BirthTimeStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localHour, setLocalHour] = useState<string | "">(
    data.birthTime ? data.birthTime.split(":")[0] : ""
  );
  const [localMinute, setLocalMinute] = useState<string | "">(
    data.birthTime ? data.birthTime.split(":")[1] : ""
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  useEffect(() => {
    if (hasInteracted && localHour !== "" && localMinute !== "") {
      const timeValue = `${localHour}:${localMinute}`;
      const result = birthTimeSchema.safeParse(timeValue);
      if (!result.success) {
        setError("birthTime", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthTime", null);
        updateData("birthTime", timeValue);
      }
    } else if (hasInteracted && (localHour === "" || localMinute === "")) {
      setError("birthTime", null);
    }
  }, [localHour, localMinute, hasInteracted, updateData, setError]);

  const handleHourChange = (value: string) => {
    setHasInteracted(true);
    setLocalHour(value);
  };

  const handleMinuteChange = (value: string) => {
    setHasInteracted(true);
    setLocalMinute(value);
  };

  return (
    <div className="w-full">
      <StepTitle color="green">¿A qué hora naciste?</StepTitle>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        {/* Hour */}
        <div className="flex-1 max-w-[140px]">
          <Select
            value={localHour}
            onValueChange={handleHourChange}
            options={hours.map((h) => ({ value: h, label: h }))}
            placeholder="Hora"
            error={!!errors.birthTime}
          />
        </div>

        <span className="text-3xl text-dark/40">:</span>

        {/* Minute */}
        <div className="flex-1 max-w-[140px]">
          <Select
            value={localMinute}
            onValueChange={handleMinuteChange}
            options={minutes.map((m) => ({ value: m, label: m }))}
            placeholder="Minuto"
            error={!!errors.birthTime}
          />
        </div>
      </div>

      {errors.birthTime && hasInteracted && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-200/70 text-center"
        >
          {errors.birthTime}
        </motion.p>
      )}
    </div>
  );
}
