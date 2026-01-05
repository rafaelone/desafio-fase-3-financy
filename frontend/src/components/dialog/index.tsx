import * as DialogUi from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogProps) {
  return (
    <DialogUi.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogUi.Trigger asChild>{trigger}</DialogUi.Trigger>}

      <DialogUi.Portal>
        <DialogUi.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogUi.Content className="p-6 border border-gray-200 rounded-xl fixed left-[50%] top-[50%] z-50  translate-x-[-50%] translate-y-[-50%] bg-white  shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0.5">
              <DialogUi.Title className="font-semibold text-base leading-6 text-gray-800">
                {title}
              </DialogUi.Title>
              <DialogUi.Description className="font-normal text-sm leading-5 text-gray-600 ">
                {description}
              </DialogUi.Description>
            </div>
            <DialogUi.Close className="rounded-lg size-8 hover:bg-gray-100 transition-colors bg-white border border-gray-300 flex items-center justify-center">
              <X className="size-5 text-gray-600" />
            </DialogUi.Close>
          </div>
          {children}
        </DialogUi.Content>
      </DialogUi.Portal>
    </DialogUi.Root>
  );
}
