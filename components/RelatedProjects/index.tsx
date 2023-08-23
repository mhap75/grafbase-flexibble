import { ProjectInterface, UserProfile } from "@/common.type";
import { getUserProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

type RelatedProjectsProps = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ projectId, userId }: RelatedProjectsProps) => {
  const { user } = (await getUserProjects(userId)) as {
    user?: UserProfile;
  };

  const relatedProjects = user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node.id !== projectId,
  );

  if (relatedProjects?.length === 0) return null;

  return (
    <section className="flexCol mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {user?.name}</p>
        <Link
          href={`/profile/${user?.id}`}
          className="text-base text-primary-purple"
        >
          View all
        </Link>
      </div>

      <div className="related_projects-grid">
        {relatedProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node.id}`}
              className="flexCenter sizeFull group relative"
            >
              <Image
                src={node.image}
                width={414}
                height={314}
                alt={node.title}
                className="sizeFull rounded-2xl object-cover"
              />

              <div className="related_project-card_title hidden group-hover:flex">
                <p className="w-full">{node.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
