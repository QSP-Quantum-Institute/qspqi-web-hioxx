import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
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
  searchable?: boolean;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar",
  error = false,
  className,
  searchable = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens and searchable
      if (searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, searchable]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  const filteredOptions = searchable && searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery("");
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={handleOpen}
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
              "flex flex-col"
            )}
          >
            {searchable && (
              <div className="p-2 border-b border-gray-200/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    className={cn(
                      "w-full",
                      "pl-10 pr-4 py-2",
                      "text-base",
                      "bg-transparent",
                      "border-0",
                      "border-b border-gray-200/30",
                      "focus:outline-none",
                      "focus:border-gold/50",
                      "transition-colors",
                      "text-dark/70"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div className={cn("overflow-y-auto", searchable ? "max-h-48" : "max-h-64")}>
              <div className="p-2">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
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
                  })
                ) : (
                  <div className="px-4 py-3 text-center text-gray-400 text-lg">
                    No se encontraron resultados
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
