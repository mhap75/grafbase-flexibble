export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { UserProfile } from "@/components";
import { getUserProjects } from "@/lib/actions";

type ProfileProps = {
  params: {
    id: string;
  };
};

const Profile = async ({ params: { id } }: ProfileProps) => {
  const { user } = (await getUserProjects(id, 100)) as { user: UserProfile };
  console.log(user);

  if (!user)
    return (
      <p className="flexCenter h-full">
        Something broke while loading the page. Please try again.
      </p>
    );

  return <UserProfile user={user} />;
};

export default Profile;
