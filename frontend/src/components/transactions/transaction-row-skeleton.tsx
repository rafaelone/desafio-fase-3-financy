import { Skeleton } from '../ui/skeleton';

export function TransactionRowSkeleton() {
  return (
    <tr>
      <td className="pl-6 py-4 border-b border-gray-200">
        <div className="flex gap-4 items-center">
          <Skeleton className="size-10 rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>
      </td>
      <td className="py-4 border-b border-gray-200 text-center">
        <Skeleton className="h-5 w-16 mx-auto" />
      </td>
      <td className="py-4 border-b border-gray-200 text-center">
        <Skeleton className="h-7 w-24 rounded-full mx-auto" />
      </td>
      <td className="py-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </td>
      <td className="py-4 border-b border-gray-200 text-right">
        <Skeleton className="h-5 w-24 ml-auto" />
      </td>
      <td className="pr-6 py-4 border-b border-gray-200 text-right">
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}
