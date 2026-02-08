import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useStepperStore } from "../../stores";
import { fullNameSchema } from "../../common/schemas/stepperSchemas";

export function NameStep() {
  const { data, updateData, errors, setError } = useStepperStore();
  const [localValue, setLocalValue] = useState(data.fullName);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const result = fullNameSchema.safeParse(localValue);
      if (!result.success) {
        setError("fullName", result.error.issues[0]?.message || "Error");
      } else {
        setError("fullName", null);
        updateData("fullName", localValue);
      }
    }
  }, [localValue, touched, updateData, setError]);

  const handleBlur = () => {
    setTouched(true);
    const result = fullNameSchema.safeParse(localValue);
    if (!result.success) {
      setError("fullName", result.error.issues[0]?.message || "Error");
    } else {
      setError("fullName", null);
      updateData("fullName", localValue);
    }
  };

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
          className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gold-50 to-gold-100 rounded-full flex items-center justify-center"
        >
          <User className="w-10 h-10 text-gold" />
        </motion.div>
        <h2 className="text-3xl font-bold text-dark mb-2">
          ¿Cuál es tu nombre completo?
        </h2>
        <p className="text-gray-600">
          Por favor ingresa tu nombre y apellido completo
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          placeholder="Ej: Juan Pérez García"
          className={`
            w-full px-4 py-4 pl-12
            text-lg
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
            transition-all duration-200
            ${
              errors.fullName
                ? "border-red-200 bg-red-50"
                : "border-gray-300 bg-white focus:border-gold"
            }
          `}
        />
        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {errors.fullName && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-200 flex items-center space-x-1"
        >
          <span>⚠</span>
          <span>{errors.fullName}</span>
        </motion.p>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Esta información nos ayuda a personalizar tu experiencia
        </p>
      </div>
    </motion.div>
  );
}
