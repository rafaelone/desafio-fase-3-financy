import { Skeleton } from '../ui/skeleton';

export function DashboardCategorySkeleton() {
  return (
    <li className="flex items-center justify-between gap-8 max-sm:flex-col max-sm:gap-4">
      <Skeleton className="h-7 w-32 rounded-full" />

      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
    </li>
  );
}
