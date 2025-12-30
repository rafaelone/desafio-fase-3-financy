import { BalanceContainer } from '@/components/dashboard/balance-container';
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Utensils,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashBoard() {
  return (
    <main className="max-w-[1184px] w-auto mx-auto mt-12">
      {/* cards */}
      <BalanceContainer />
      <div className="flex gap-6 mt-6 items-start">
        {/* tabela de transacoes */}
        <div className="w-full max-w-[781px] bg-white rounded-xl border border-gray-200">
          {/* header */}
          <div className="flex items-center justify-between h-[61px] border-b border-b-gray-200 px-6">
            <span className="font-medium text-xs leading-4  text-gray-500 uppercase">
              Transações recentes
            </span>
            <Link
              to="/"
              className="text-brand-base items-center flex gap-1 font-medium text-sm leading-5 group hover:text-brand-dark"
            >
              Ver todas
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <div className="grid grid-cols-[1fr_160px_160px] items-center gap-4 px-6 h-[80px] border-b border-b-gray-200">
            {/* Informações principais - ocupa o espaço disponível (1fr) */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-10 rounded-[8px] bg-green-light flex items-center justify-center shrink-0">
                <BriefcaseBusiness className="size-4 text-green-base" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <strong className="font-medium text-base leading-6 text-gray-800 truncate">
                  Pagamento de Salário
                </strong>

                <span className="font-normal text-sm leading-5 text-gray-600">
                  01/12/25
                </span>
              </div>
            </div>

            {/* Badge de Receita - coluna fixa de 160px */}
            <div className="flex justify-center">
              <span className="px-6 py-1 rounded-full bg-green-light text-green-dark font-medium text-sm leading-5">
                Receita
              </span>
            </div>

            {/* Valor - largura automática */}
            <div className="flex items-center gap-2 justify-end">
              <strong className="font-semibold text-sm leading-5 text-right text-gray-800">
                + R$ 4.250,00
              </strong>
              <CircleArrowUp className="size-4 text-brand-base" />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_160px_160px] items-center gap-4 px-6 h-[80px] border-b border-b-gray-200">
            {/* Informações principais - ocupa o espaço disponível (1fr) */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-10 rounded-[8px] bg-blue-light flex items-center justify-center shrink-0">
                <Utensils className="size-4 text-blue-base" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <strong className="font-medium text-base leading-6 text-gray-800 truncate">
                  Jantar no Restaurante
                </strong>

                <span className="font-normal text-sm leading-5 text-gray-600">
                  30/11/25
                </span>
              </div>
            </div>

            {/* Badge de Receita - coluna fixa de 160px */}
            <div className="flex justify-center">
              <span className="px-6 py-1 rounded-full bg-blue-light text-blue-dark font-medium text-sm leading-5">
                Alimentação
              </span>
            </div>

            {/* Valor - largura automática */}
            <div className="flex items-center gap-2 justify-end">
              <strong className="font-semibold text-sm leading-5 text-right text-gray-800">
                - R$ 89,50
              </strong>
              <CircleArrowDown className="size-4 text-red-base" />
            </div>
          </div>

          <div className="h-[60px] flex items-center justify-center">
            <Link
              to="/"
              className="font-medium text-sm leading-5 text-brand-base flex items-center justify-center gap-1"
            >
              <Plus className="size-5 text-brand-base" />
              Nova transação
            </Link>
          </div>
        </div>
        {/* tabela de categorias */}
        <div className="max-w-[378px] w-full bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between h-[61px] border-b border-b-gray-200 px-6">
            <span className="font-medium text-xs leading-4  text-gray-500 uppercase">
              Categorias
            </span>
            <Link
              to="/"
              className="text-brand-base items-center flex gap-1 font-medium text-sm leading-5 group hover:text-brand-dark"
            >
              Gerenciar
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {/* Alimentação */}
            <div className="flex items-center justify-between gap-8">
              <span className="px-6 py-1 rounded-full bg-blue-light text-blue-dark font-medium text-sm leading-5 whitespace-nowrap">
                Alimentação
              </span>
              <div className="flex items-center gap-4">
                <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
                  12 itens
                </span>
                <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
                  R$ 542,30
                </strong>
              </div>
            </div>

            {/* Transporte */}
            <div className="flex items-center justify-between gap-8">
              <span className="px-6 py-1 rounded-full bg-purple-light text-purple-dark font-medium text-sm leading-5 whitespace-nowrap">
                Transporte
              </span>
              <div className="flex items-center gap-4">
                <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
                  8 itens
                </span>
                <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
                  R$ 385,50
                </strong>
              </div>
            </div>

            {/* Mercado */}
            <div className="flex items-center justify-between gap-8">
              <span className="px-6 py-1 rounded-full bg-orange-light text-orange-dark font-medium text-sm leading-5 whitespace-nowrap">
                Mercado
              </span>
              <div className="flex items-center gap-4">
                <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
                  3 itens
                </span>
                <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
                  R$ 298,75
                </strong>
              </div>
            </div>

            {/* Entretenimento */}
            <div className="flex items-center justify-between gap-8">
              <span className="px-6 py-1 rounded-full bg-pink-light text-pink-dark font-medium text-sm leading-5 whitespace-nowrap">
                Entretenimento
              </span>
              <div className="flex items-center gap-4">
                <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
                  2 itens
                </span>
                <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
                  R$ 186,20
                </strong>
              </div>
            </div>

            {/* Utilidades */}
            <div className="flex items-center justify-between gap-8">
              <span className="px-6 py-1 rounded-full bg-yellow-light text-yellow-dark font-medium text-sm leading-5 whitespace-nowrap">
                Utilidades
              </span>
              <div className="flex items-center gap-4">
                <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
                  7 itens
                </span>
                <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
                  R$ 245,80
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
