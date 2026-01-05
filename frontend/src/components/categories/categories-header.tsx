import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Dialog } from '../dialog';
import { DialogFormCategory } from '../dialog/dialog-form-category';
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/create-category';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { colorMap } from '@/utils/colorMap';

export function CategoriesHeader() {
  const [open, setOpen] = useState<boolean>(false);

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setOpen(false);
      toast.success('Categoria criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar categoria');
    },
  });

  const handleCreateCategory = (data: {
    title: string;
    description?: string;
    icon: string;
    color: string;
  }) => {
    const colorHex = colorMap[data.color] || data.color;

    createCategory({
      variables: {
        data: {
          title: data.title,
          description: data.description || '',
          icon: data.icon,
          color: colorHex,
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-center flex-col gap-0.5">
        <strong className="font-bold text-2xl leading-8 text-gray-800">
          Categorias
        </strong>
        <span className="font-normal text-base leading-6 text-gray-600">
          Organize suas transações por categorias
        </span>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            background="primary"
            size="sm"
            fontSize="sm"
            className="gap-1"
          >
            <Plus className="size-4" />
            Nova categoria
          </Button>
        }
        title="Nova categoria"
        description="Organize suas transações com categorias"
      >
        <DialogFormCategory onSubmit={handleCreateCategory} />
      </Dialog>
    </div>
  );
}
