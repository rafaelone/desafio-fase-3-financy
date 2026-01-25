import { forwardRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import 'react-day-picker/style.css';

type DatePickerProps = {
  htmlFor: string;
  labelText: string;
  errorMessage?: string;
  value?: string;
  onChange?: (date: string) => void;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ htmlFor, labelText, errorMessage, value, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Corrige o bug de timezone: cria a data no timezone local
    const selectedDate = value ? new Date(value + 'T00:00:00') : undefined;

    const handleSelect = (date: Date | undefined) => {
      if (date && onChange) {
        // Garante que a data seja formatada no timezone local
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${day}`);
      }
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col gap-2 w-full min-w-0 relative">
        <label
          htmlFor={htmlFor}
          className="text-grau-700 font-medium text-sm leading-5"
        >
          {labelText}
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center justify-between gap-3 h-12 hover:border-brand-base transition-colors min-w-0"
        >
          <span className="font-normal text-base leading-7 text-gray-400 truncate">
            {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Selecione'}
          </span>
          <Calendar className="size-5 text-gray-400 shrink-0" />
        </button>
        <input
          ref={ref}
          type="hidden"
          id={htmlFor}
          value={value || ''}
          onChange={() => {}}
        />
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                locale={ptBR}
              />
            </div>
          </>
        )}
        {errorMessage && (
          <span className="text-danger font-normal text-xs leading-4 block">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
