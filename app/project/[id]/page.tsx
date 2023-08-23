import { ProjectInterface } from "@/common.type";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/containers";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { ProjectActions, RelatedProjects } from "@/components";

type ProjectProps = {
  params: {
    id: string;
  };
};

const Project = async ({ params: { id } }: ProjectProps) => {
  const session = await getCurrentUser();
  const { project } = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!project)
    return (
      <p className="sizeFull flexCenter font-semibold">
        Something went wrong when getting the page data. You might as well
        refresh the page.
      </p>
    );

  const renderLink = () => `/profile/${project?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween w-full max-w-4xl gap-y-8 max-xs:flex-col">
        <div className="flex w-full flex-1 items-start gap-5 max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={project?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flexStart flex-1 flex-col gap-1">
            <p className="self-start text-lg font-semibold">{project?.title}</p>
            <div className="user-info">
              <Link href={renderLink()}>{project?.createdBy?.name}</Link>
              <Image src="/assets/images/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${project.category}`}
                className="font-semibold text-primary-purple"
              >
                {project?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === project?.createdBy?.email && (
          <div className="flex items-center justify-end gap-2">
            <ProjectActions projectId={project?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${project?.image}`}
          className="rounded-2xl object-cover"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter mt-20 flex-col">
        <p className="max-w-5xl text-xl font-normal">{project?.description}</p>

        <div className="mt-5 flex flex-wrap gap-5">
          <Link
            href={project?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter tex-sm gap-2 font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={project?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter tex-sm gap-2 font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter mt-28 w-full gap-8">
        <span className="h-0.5 w-full bg-light-white-200" />
        <Link href={renderLink()} className="h-[82px] min-w-[82px]">
          <Image
            src={project?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="h-0.5 w-full bg-light-white-200" />
      </section>
      
      <RelatedProjects
        userId={project?.createdBy?.id}
        projectId={project?.id}
      />
    </Modal>
  );
};

export default Project;
