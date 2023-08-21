import { ProjectForm } from "@/components";
import { Modal } from "@/containers";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const session = await getCurrentUser();

  if (!session) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Add a new project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreatePage;
