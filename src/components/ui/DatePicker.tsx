import { useState, useEffect, useMemo, useRef } from "react";
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
  // Initialize state from value prop
  const getInitialState = () => {
    if (value) {
      const date = dayjs(value);
      return {
        day: date.date() as number | "",
        month: date.month() as number | "",
        year: date.year() as number | "",
      };
    }
    return { day: "" as number | "", month: "" as number | "", year: "" as number | "" };
  };

  const [day, setDay] = useState<number | "">(getInitialState().day);
  const [month, setMonth] = useState<number | "">(getInitialState().month);
  const [year, setYear] = useState<number | "">(getInitialState().year);

  // Track if we're updating from internal changes to avoid sync updates in effect
  const isInternalChangeRef = useRef(false);
  const previousValueRef = useRef<string | null>(value);

  // Update state when value prop changes (from external source only)
  useEffect(() => {
    // Skip if this change was triggered internally
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      previousValueRef.current = value;
      return;
    }

    // Skip if value hasn't actually changed
    if (previousValueRef.current === value) {
      return;
    }

    previousValueRef.current = value;

    // Use setTimeout to defer state updates and avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      if (value) {
        const date = dayjs(value);
        const newDay = date.date();
        const newMonth = date.month();
        const newYear = date.year();
        
        setDay(newDay);
        setMonth(newMonth);
        setYear(newYear);
      } else {
        setDay("");
        setMonth("");
        setYear("");
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    if (day !== "" && month !== "" && year !== "") {
      const date = dayjs(`${year}-${(month as number) + 1}-${day}`);
      if (date.isValid()) {
        isInternalChangeRef.current = true;
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

  // Calculate valid days based on selected month and year
  const dayOptions = useMemo(() => {
    if (month !== "" && year !== "") {
      const maxDays = getDaysInMonth(year as number, month as number);
      return Array.from({ length: maxDays }, (_, i) => i + 1);
    }
    // If no month selected, show all 31 days
    return days;
  }, [month, year]);

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
            searchable={true}
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
            searchable={true}
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
