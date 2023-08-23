"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "..";

type ProjectActionsProps = {
  projectId: string;
};

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push("/");
    } catch (error: any) {
      throw new Error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn hover:opacity-80"
      >
        <Image
          src="/assets/images/pencil.svg"
          width={15}
          height={15}
          alt="edit"
        />
      </Link>

      <Button
        className={`delete-action_btn ${
          isDeleting ? "bg-gray text-white" : "bg-pink-700"
        }`}
        loading={isDeleting}
        onClick={handleDeleteProject}
      >
        <Image
          src="/assets/images/trash.svg"
          width={15}
          height={15}
          alt="delete"
        />
      </Button>
    </>
  );
};

export default ProjectActions;
