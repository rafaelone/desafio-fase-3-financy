import { Header } from '@/components/Header';
import {
  ArrowUpDown,
  Plus,
  SquarePen,
  Tag,
  Trash,
  Utensils,
} from 'lucide-react';

export function Categories() {
  return (
    <div>
      <Header />
      <div className="px-12">
        <div className="max-w-[1184px] w-auto mx-auto mt-12">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex justify-center flex-col gap-0.5">
              <strong className="font-bold text-2xl leading-8 text-gray-800">
                Categorias
              </strong>
              <span className="font-normal text-base leading-6 text-gray-600">
                Organize suas transações por categorias
              </span>
            </div>
            <button className="bg-brand-base  px-3 justify-center py-2 text-white flex items-center gap-2 rounded-[8px] h-9 font-medium text-sm leading-5 hover:bg-brand-dark transition-colors">
              <Plus className="size-4" />
              Nova categoria
            </button>
          </div>
          {/* cards */}
          <div className="my-8 flex items-center gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
              <Tag className="size-8 text-gray-700" />
              <div className="flex flex-col gap-2">
                <strong className="text-gray-800 font-bold text-[28px] leading-8">
                  8
                </strong>
                <span className="font-medium uppercase text-xs text-gray-500 leading-4">
                  total de categorias
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
              <ArrowUpDown className="size-8 text-purple-base" />
              <div className="flex flex-col gap-2">
                <strong className="text-gray-800 font-bold text-[28px] leading-8">
                  27
                </strong>
                <span className="font-medium uppercase text-xs text-gray-500 leading-4">
                  Total de transações
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
              <Utensils className="size-8 text-blue-base" />
              <div className="flex flex-col gap-2">
                <strong className="text-gray-800 font-bold text-[28px] leading-8">
                  Alimentação
                </strong>
                <span className="font-medium uppercase text-xs text-gray-500 leading-4">
                  categoria mais utilizada
                </span>
              </div>
            </div>
          </div>
          {/* cards */}
          {/* list cards */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 max-w-[284px] w-full gap-5 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center bg-blue-light size-10 rounded-lg">
                  <Utensils className="size-4 text-blue-base" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <Trash className="size-4 text-danger" />
                  </button>
                  <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center">
                    <SquarePen className="size-4 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-base leading-6 text-gray-800">
                  Alimentação
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  Restaurantes, delivery e refeições
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1  text-blue-base bg-blue-light text-sm font-medium leading-5 rounded-full">
                  Alimentação
                </span>
                <span className="text-gray-600 font-normal text-sm leading-5">
                  12 itens
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
