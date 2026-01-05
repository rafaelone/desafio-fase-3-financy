import { Skeleton } from '../ui/skeleton';

export function CardCategorySkeleton() {
  return (
    <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 w-[284px] gap-5">
      <div className="flex items-start justify-between">
        <Skeleton className="size-10 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
