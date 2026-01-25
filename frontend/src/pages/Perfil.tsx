import { ProfileForm } from '@/components/forms/profile-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/utils/getInitials';
import { useQuery } from '@apollo/client/react';
import { GET_ME } from '@/lib/graphql/queries/me';
import { Skeleton } from '@/components/ui/skeleton';

export function Perfil() {
  const { data, loading } = useQuery<{
    me: {
      id: string;
      fullName: string;
      email: string;
    };
  }>(GET_ME);

  const user = data?.me;

  if (loading) {
    return (
      <div className="max-w-[448px] mx-auto p-8 bg-white rounded-xl border border-gray-200 mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-6 items-center justify-center">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex flex-col gap-2 items-center">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[72px] w-full" />
          <Skeleton className="h-[72px] w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-[448px] mx-auto p-8 bg-white rounded-xl border border-gray-200 mt-12 flex flex-col gap-8">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Avatar className="size-16">
          <AvatarFallback className="bg-gray-300 text-gray-800 font-medium  text-2xl leading-5">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-800 font-semibold text-center font text-[20px] leading-7">
            {user.fullName}
          </span>
          <span className="font-normal text-gray-500  text-base leading-6">
            {user.email}
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200" />

      <ProfileForm
        initialData={{
          fullName: user.fullName,
          email: user.email,
        }}
      />
    </div>
  );
}
