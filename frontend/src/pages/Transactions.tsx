import { Header } from '@/components/Header';
import { MonthPicker } from '@/components/MonthPicker';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  Plus,
  Search,
  SquarePen,
  Trash,
  Utensils,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Transactions() {
  return (
    <div>
      <Header />
      <div className="px-12">
        <div className="max-w-[1184px] w-auto mx-auto mt-12">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex justify-center flex-col gap-0.5">
              <strong className="font-bold text-2xl leading-8 text-gray-800">
                Transações
              </strong>
              <span className="font-normal text-base leading-6 text-gray-600">
                Gerencie todas as suas transações financeiras
              </span>
            </div>
            <button className="bg-brand-base  px-3 justify-center py-2 text-white flex items-center gap-2 rounded-[8px] h-9 font-medium text-sm leading-5 hover:bg-brand-dark transition-colors">
              <Plus className="size-4" />
              Nova transação
            </button>
          </div>
          {/* filters */}
          <div className="w-full p-6 flex items-end gap-4 bg-white mt-8 border border-gray-200 rounded-xl">
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="search"
                  className="text-gray-700 font-medium text-sm leading-5"
                >
                  Buscar
                </label>
                <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12">
                  <Search className="text-gray-400 size-4" />
                  <input
                    id="search"
                    placeholder="Buscar por descrição"
                    type="text"
                    className="font-normal text-base leading-7 text-gray-400 flex-1 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm leading-5">
                  Tipo
                </label>
                <div className="relative">
                  <select className="appearance-none w-full rounded-lg px-4 pr-10 h-12 bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 outline-none cursor-pointer font-normal text-base">
                    <option value="todos">Todos</option>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm leading-5">
                  Categorias
                </label>
                <div className="relative">
                  <select className="appearance-none w-full rounded-lg px-4 pr-10 h-12 bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 outline-none cursor-pointer font-normal text-base">
                    <option value="todos">Todas</option>
                    <option value="receita">Alimentação</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm leading-5">
                  Período
                </label>
                <MonthPicker />
              </div>
            </div>
          </div>
          {/* filters */}
          {/* tabela */}
          <div className="bg-white rounded-xl border border-gray-200 w-full mt-8 overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="font-medium text-xs text-gray-500 uppercase text-left h-[57px] pl-6">
                    descrição
                  </th>
                  <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                    data
                  </th>
                  <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                    categoria
                  </th>
                  <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                    tipo
                  </th>
                  <th className="font-medium text-xs text-gray-500 uppercase text-right ">
                    valor
                  </th>
                  <th className="font-medium text-xs text-gray-500 uppercase text-right pr-6">
                    ações
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="pl-6 py-4 border-b border-gray-200">
                    <div className="flex gap-4 items-center ">
                      <div className="size-10 bg-blue-light flex items-center justify-center rounded-lg">
                        <Utensils className="size-4 text-blue-base " />
                      </div>
                      <span>Jantar no Restaurante</span>
                    </div>
                  </td>
                  <td className="py-4 border-b border-gray-200 text-center">
                    <span className=" font-normal text-sm text-gray-600 leading-5 text-center">
                      30/11/25
                    </span>
                  </td>
                  <td className=" py-4 border-b border-gray-200 text-center">
                    <span className=" font-medium text-sm bg-blue-light text-blue-dark px-3 py-1 rounded-full">
                      Alimentação
                    </span>
                  </td>
                  <td className=" py-4 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                      <CircleArrowDown className="size-4 text-red-base" />
                      <span className=" font-medium text-sm text-red-dark">
                        Saida
                      </span>
                    </div>
                  </td>
                  <td className=" py-4 border-b border-gray-200 text-right">
                    <span className=" font-semibold text-sm text-gray-800">
                      - R$ 89,50
                    </span>
                  </td>
                  <td className="pr-6 py-4 border-b border-gray-200 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="size-8 border border-gray-200 bg-white rounded-lg text-danger flex items-center justify-center">
                        <Trash className="size-4" />
                      </button>
                      <button className="size-8 border border-gray-200 bg-white rounded-lg text-gray-700 flex items-center justify-center">
                        <SquarePen className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <footer className="px-6 py-5 flex items-center justify-between">
              <span className="flex gap-1 font-normal text-sm text-gray-700">
                1 a 10
                <span className="h-5 bg-gray-700 w-px block" />
                27 resultados
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="opacity-70 size-8 rounded-lg text-gray-700 border border-gray-300 flex items-center justify-center"
                >
                  <ChevronLeft className="size-4" />
                </Link>
                <Link
                  to="/"
                  className="size-8 rounded-lg bg-brand-base text-white border hover:bg-brand-dark transition-colors flex items-center justify-center"
                >
                  1
                </Link>
                <Link
                  to="/"
                  className="size-8 rounded-lg bg-white text-gray-700 border border-gray-300 transition-colors flex items-center justify-center"
                >
                  2
                </Link>
                <Link
                  to="/"
                  className="size-8 rounded-lg text-gray-700 border border-gray-300 flex items-center justify-center"
                >
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </footer>
          </div>
          {/* tabela */}
        </div>
      </div>
    </div>
  );
}
