import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  ShoppingCart,
  Utensils,
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  Ticket,
  ToolCase,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
  LoaderCircle,
} from 'lucide-react';
import { Button } from '../ui/button';

const categorySchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.string().min(1, 'Selecione uma cor'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type DialogFormCategoryProps = {
  onSubmit: (data: CategoryFormData) => void;
  initialData?: {
    title: string;
    description?: string;
    icon: string;
    color: string;
  };
};

export function DialogFormCategory({
  onSubmit,
  initialData,
}: DialogFormCategoryProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      icon: 'business',
      color: 'green',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4 max-w-[398px] w-full"
    >
      <Input
        {...register('title')}
        htmlFor="title"
        labelText="Título"
        placeholder="Ex. Alimentação"
      />

      <div className="flex flex-col gap-2">
        <Input
          {...register('description')}
          htmlFor="description"
          labelText="Descrição"
          placeholder="Descrição da categoria"
        />
        <span className="text-gray-500 font-normal text-xs leading-4">
          Opcional
        </span>
      </div>

      <div>
        <label className="font-medium text-sm leading-5 text-gray-700 mb-2 block">
          Ícone
        </label>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex-row gap-2 flex-wrap"
            >
              <RadioGroupItem
                value="business"
                icon={
                  <BriefcaseBusiness className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="car"
                icon={
                  <CarFront className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="heart"
                icon={
                  <HeartPulse className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="bank"
                icon={
                  <PiggyBank className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="shopping"
                icon={
                  <ShoppingCart className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="ticket"
                icon={
                  <Ticket className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="tool"
                icon={
                  <ToolCase className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="utensils"
                icon={
                  <Utensils className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="pet"
                icon={
                  <PawPrint className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="house"
                icon={
                  <House className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="gift"
                icon={
                  <Gift className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="gym"
                icon={
                  <Dumbbell className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="book"
                icon={
                  <BookOpen className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="travel"
                icon={
                  <BaggageClaim className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="mail"
                icon={
                  <Mailbox className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
              <RadioGroupItem
                value="receipt"
                icon={
                  <ReceiptText className="size-5 text-gray-500 group-data-[state=checked]:text-gray-600" />
                }
              />
            </RadioGroup>
          )}
        />
        {errors.icon && (
          <span className="text-danger text-xs mt-1">
            {errors.icon.message}
          </span>
        )}
      </div>

      <div>
        <label className="font-medium text-sm leading-5 text-gray-700 mb-2 block">
          Cor
        </label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex-row gap-2"
            >
              <RadioGroupItem value="green" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-green-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="blue" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-blue-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="purple" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-purple-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="pink" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-pink-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="red" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-red-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="orange" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-orange-base rounded" />
              </RadioGroupItem>
              <RadioGroupItem value="yellow" className="w-[50px] h-[30px] p-1">
                <div className="w-full h-full bg-yellow-base rounded" />
              </RadioGroupItem>
            </RadioGroup>
          )}
        />
        {errors.color && (
          <span className="text-danger text-xs mt-1">
            {errors.color.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        background="primary"
        fontSize="base"
        className="mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Salvar'}
      </Button>
    </form>
  );
}
