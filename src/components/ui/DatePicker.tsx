import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Select } from "./Select";

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
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

  const handleDayChange = (val: string) => {
    const newDay = parseInt(val);
    setDay(newDay);
    
    if (month !== "" && year !== "") {
      const maxDays = getDaysInMonth(year as number, month as number);
      if (newDay > maxDays) {
        setDay(maxDays);
      }
    }
  };

  const handleMonthChange = (val: string) => {
    const newMonth = parseInt(val);
    setMonth(newMonth);
    
    if (day !== "" && year !== "") {
      const maxDays = getDaysInMonth(year as number, newMonth);
      if ((day as number) > maxDays) {
        setDay(maxDays);
      }
    }
  };

  const handleYearChange = (val: string) => {
    const newYear = parseInt(val);
    setYear(newYear);
    
    if (day !== "" && month !== "") {
      const maxDays = getDaysInMonth(newYear, month as number);
      if ((day as number) > maxDays) {
        setDay(maxDays);
      }
    }
  };

  const dayOptions = day !== "" && month !== "" && year !== ""
    ? Array.from({ length: getDaysInMonth(year as number, month as number) }, (_, i) => i + 1)
    : days;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {/* Day */}
        <div className="flex-1 max-w-[120px]">
          <Select
            value={day}
            onValueChange={handleDayChange}
            options={dayOptions.map((d) => ({ value: d, label: String(d) }))}
            placeholder="Día"
            error={!!error}
          />
        </div>

        {/* Month */}
        <div className="flex-1 max-w-[180px]">
          <Select
            value={month}
            onValueChange={handleMonthChange}
            options={months.map((m, index) => ({ value: index, label: m }))}
            placeholder="Mes"
            error={!!error}
          />
        </div>

        {/* Year */}
        <div className="flex-1 max-w-[140px]">
          <Select
            value={year}
            onValueChange={handleYearChange}
            options={years.map((y) => ({ value: y, label: String(y) }))}
            placeholder="Año"
            error={!!error}
          />
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
