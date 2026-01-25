import { Skeleton } from '../ui/skeleton';

export function DashboardTransactionSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_160px_160px] items-center gap-4 px-6 h-[80px] border-b border-b-gray-200 max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:p-6">
      <div className="flex items-center gap-4 min-w-0">
        <Skeleton className="size-10 rounded-lg" />
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex justify-center max-lg:ml-auto max-sm:ml-0">
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}
