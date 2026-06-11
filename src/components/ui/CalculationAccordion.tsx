import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

interface CalculationAccordionProps {
  items: AccordionItem[];
  borderClass?: string;
  textAccentClass?: string;
}

export function CalculationAccordion({
  items,
  borderClass = "border-gold/25",
  textAccentClass = "text-gold",
}: CalculationAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen && !item.disabled) initial.add(item.id);
    });
    return initial;
  });

  const toggle = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border overflow-hidden bg-white/50 backdrop-blur-sm",
              borderClass,
              item.disabled && "opacity-50"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id, item.disabled)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 text-left",
                "transition-colors duration-200",
                !item.disabled && "cursor-pointer hover:bg-white/40",
                item.disabled && "cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "text-lg font-light display-font tracking-wide",
                  item.disabled ? "text-gray-400" : textAccentClass
                )}
              >
                {item.title}
              </span>
              {!item.disabled && (
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && !item.disabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 border-t border-gray-100/80">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
