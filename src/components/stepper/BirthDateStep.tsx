import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { useStepperStore } from "../../stores";
import { birthDateSchema } from "../../common/schemas/stepperSchemas";

export function BirthDateStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState(
    data.birthDate || dayjs().format("YYYY-MM-DD")
  );
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const result = birthDateSchema.safeParse(localValue);
      if (!result.success) {
        setError("birthDate", result.error.issues[0]?.message || "Error");
      } else {
        setError("birthDate", null);
        updateData("birthDate", localValue);
      }
    }
  }, [localValue, touched, updateData, setError]);

  const handleBlur = () => {
    setTouched(true);
    const result = birthDateSchema.safeParse(localValue);
    if (!result.success) {
      setError("birthDate", result.error.issues[0]?.message || "Error");
    } else {
      setError("birthDate", null);
      updateData("birthDate", localValue);
    }
  };

  const maxDate = dayjs().format("YYYY-MM-DD");
  const minDate = dayjs().subtract(120, "years").format("YYYY-MM-DD");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-lightBlue-50 to-lightBlue-100 rounded-full flex items-center justify-center"
        >
          <Calendar className="w-10 h-10 text-lightBlue-200" />
        </motion.div>
        <h2 className="text-3xl font-bold text-dark mb-2">
          ¿Cuál es tu fecha de nacimiento?
        </h2>
        <p className="text-gray-600">
          Esta información es importante para cálculos precisos
        </p>
      </div>

      <div className="relative">
        <input
          type="date"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          min={minDate}
          max={maxDate}
          className={`
            w-full px-4 py-4 pl-12
            text-lg
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-lightBlue-200 focus:ring-offset-2
            transition-all duration-200
            ${
              errors.birthDate
                ? "border-red-200 bg-red-50"
                : "border-gray-300 bg-white focus:border-lightBlue-200"
            }
          `}
        />
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {errors.birthDate && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-200 flex items-center space-x-1"
        >
          <span>⚠</span>
          <span>{errors.birthDate}</span>
        </motion.p>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Tu información está protegida y será utilizada únicamente para
          cálculos energéticos
        </p>
      </div>
    </motion.div>
  );
}
