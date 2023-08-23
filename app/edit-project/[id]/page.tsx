import { ProjectInterface } from "@/common.type";
import { ProjectForm } from "@/components";
import { Modal } from "@/containers";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const { project } = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
    };
    

  return (
    <Modal>
      <h3 className="modal-head-text">Edit {project?.title}</h3>

      <ProjectForm project={project} type="edit" session={session} />
    </Modal>
  );
};

export default EditProject;
