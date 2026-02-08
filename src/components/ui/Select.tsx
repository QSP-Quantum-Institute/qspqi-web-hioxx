import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  value: string | number | "";
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar",
  error = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
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
          "flex items-center justify-between",
          "cursor-pointer",
          error
            ? "border-red-200/50 text-red-200"
            : "border-gray-200/50 text-dark/70 focus:border-gold/50 hover:border-gold/30",
          className
        )}
      >
        <span className="flex-1">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 opacity-50 ml-2" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute",
              "top-full",
              "left-0",
              "right-0",
              "mt-2",
              "overflow-hidden",
              "bg-white/95",
              "backdrop-blur-sm",
              "rounded-lg",
              "shadow-xl",
              "border border-gray-200/50",
              "z-50",
              "max-h-64",
              "overflow-y-auto"
            )}
          >
            <div className="p-2">
              {options.map((option) => {
                const isSelected = String(option.value) === String(value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(String(option.value))}
                    className={cn(
                      "w-full",
                      "relative",
                      "flex items-center justify-center",
                      "px-4 py-3",
                      "text-xl md:text-2xl",
                      "text-dark/70",
                      "rounded-md",
                      "cursor-pointer",
                      "outline-none",
                      "transition-colors",
                      "hover:bg-gold/10",
                      "focus:bg-gold/10",
                      isSelected && "bg-gold/20 text-gold"
                    )}
                  >
                    {option.label}
                    {isSelected && (
                      <Check className="absolute right-2 w-5 h-5 text-gold" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
