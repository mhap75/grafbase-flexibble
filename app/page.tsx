export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { ProjectInterface } from "@/common.type";
import { Categories, LoadMore, ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type HomeProps = {
  searchParams: {
    category?: string;
    endcursor?: string;
  };
};

const Home = async ({ searchParams: { category, endcursor } }: HomeProps) => {
  const { projectSearch } = (await fetchAllProjects(
    category,
    endcursor,
  )) as ProjectSearch;

  const projectsToDisplay = projectSearch?.edges || [];

  if (projectsToDisplay.length === 0)
    return (
      <section className="flexStart paddings flex-col">
        <Categories />

        <p className="no-result-text text-center">No projects found!</p>
      </section>
    );

  return (
    <section className="flex-start paddings mb-16 flex-col">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            image={node.image}
            title={node.title}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            userId={node.createdBy.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={projectSearch?.pageInfo?.startCursor}
        endCursor={projectSearch?.pageInfo?.endCursor}
        hasPrevious={projectSearch?.pageInfo?.hasPreviousPage}
        hasNext={projectSearch?.pageInfo?.hasNextPage}
      />
    </section>
  );
};

export default Home;
