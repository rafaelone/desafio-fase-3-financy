import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';

interface MonthPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(value || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 31 }, (_, i) => currentYear - i + 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(selectedMonth.getFullYear(), monthIndex, 1);
    setSelectedMonth(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, selectedMonth.getMonth(), 1);
    setSelectedMonth(newDate);
  };

  const displayValue = format(selectedMonth, 'MMMM / yyyy', { locale: ptBR });
  const capitalizedValue =
    displayValue.charAt(0).toUpperCase() + displayValue.slice(1);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg px-4 pr-10 h-12 bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 outline-none cursor-pointer font-normal text-base text-left flex items-center"
      >
        {capitalizedValue}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-600 pointer-events-none" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-[280px]">
          <div className="mb-4">
            <select
              value={selectedMonth.getFullYear()}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none cursor-pointer"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                type="button"
                onClick={() => handleMonthClick(index)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMonth.getMonth() === index
                    ? 'bg-brand-base text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
