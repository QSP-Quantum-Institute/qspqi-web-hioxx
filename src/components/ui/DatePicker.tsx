import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils";
import dayjs from "dayjs";

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  onBlur?: () => void;
  error?: string;
  hasInteracted?: boolean;
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export function DatePicker({
  value,
  onChange,
  onBlur,
  error,
  hasInteracted = false,
}: DatePickerProps) {
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  useEffect(() => {
    if (value) {
      const date = dayjs(value);
      setDay(date.date());
      setMonth(date.month());
      setYear(date.year());
    }
  }, [value]);

  useEffect(() => {
    if (day !== "" && month !== "" && year !== "") {
      const date = dayjs(`${year}-${(month as number) + 1}-${day}`);
      if (date.isValid()) {
        onChange(date.format("YYYY-MM-DD"));
      }
    }
  }, [day, month, year, onChange]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = parseInt(e.target.value);
    setDay(newDay);
    
    // Validate if the day is valid for the selected month/year
    if (month !== "" && year !== "") {
      const maxDays = getDaysInMonth(year as number, month as number);
      if (newDay > maxDays) {
        setDay(maxDays);
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
    
    // Adjust day if it's invalid for the new month
    if (day !== "" && year !== "") {
      const maxDays = getDaysInMonth(year as number, newMonth);
      if ((day as number) > maxDays) {
        setDay(maxDays);
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    
    // Adjust day if it's invalid for the new month/year
    if (day !== "" && month !== "") {
      const maxDays = getDaysInMonth(newYear, month as number);
      if ((day as number) > maxDays) {
        setDay(maxDays);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {/* Day */}
        <div className="flex-1 max-w-[100px]">
          <select
            value={day}
            onChange={handleDayChange}
            onBlur={onBlur}
            className={cn(
              "w-full",
              "px-4 py-4",
              "text-2xl md:text-3xl",
              "text-center",
              "bg-transparent",
              "border-0",
              "border-b-2",
              "focus:outline-none",
              "transition-all duration-300",
              "appearance-none",
              "cursor-pointer",
              error
                ? "border-red-200/50 text-red-200"
                : "border-gray-200/50 text-dark/70 focus:border-gold/50"
            )}
          >
            <option value="">Día</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className="flex-1 max-w-[150px]">
          <select
            value={month}
            onChange={handleMonthChange}
            onBlur={onBlur}
            className={cn(
              "w-full",
              "px-4 py-4",
              "text-2xl md:text-3xl",
              "text-center",
              "bg-transparent",
              "border-0",
              "border-b-2",
              "focus:outline-none",
              "transition-all duration-300",
              "appearance-none",
              "cursor-pointer",
              error
                ? "border-red-200/50 text-red-200"
                : "border-gray-200/50 text-dark/70 focus:border-gold/50"
            )}
          >
            <option value="">Mes</option>
            {months.map((m, index) => (
              <option key={index} value={index}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="flex-1 max-w-[120px]">
          <select
            value={year}
            onChange={handleYearChange}
            onBlur={onBlur}
            className={cn(
              "w-full",
              "px-4 py-4",
              "text-2xl md:text-3xl",
              "text-center",
              "bg-transparent",
              "border-0",
              "border-b-2",
              "focus:outline-none",
              "transition-all duration-300",
              "appearance-none",
              "cursor-pointer",
              error
                ? "border-red-200/50 text-red-200"
                : "border-gray-200/50 text-dark/70 focus:border-gold/50"
            )}
          >
            <option value="">Año</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && hasInteracted && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-200/70 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
