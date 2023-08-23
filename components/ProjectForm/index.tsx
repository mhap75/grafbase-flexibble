"use client";

import { ProjectInterface, SessionInterface } from "@/common.type";
import { Button, CustomMenu, FormField } from "@/components";
import { categoryFilters, formSections } from "@/constants";
import { createNewProject, editProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useReducer, useState } from "react";

type ProjectFormProps = {
  type: "create" | "edit";
  session: SessionInterface;
  project?: ProjectInterface;
};

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

const submitReducer = (
  state: typeof initialState,
  { type, payload }: { type: string; payload?: any },
) => {
  switch (type) {
    case "PENDING": {
      return { isLoading: true, isError: false, data: null };
    }

    case "SUCCESS": {
      return { isLoading: false, isError: false, data: payload };
    }

    case "FAILURE": {
      return { isLoading: false, isError: true, data: null };
    }

    default:
      return state;
  }
};

const ProjectForm = ({ type, session, project }: ProjectFormProps) => {
  const [state, dispatch] = useReducer(submitReducer, initialState);
  const { isError, isLoading } = state;
  const router = useRouter();
  const [form, setForm] = useState({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "PENDING" });

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
      } else {
        await editProject(form, project?.id as string, token);
      }
      dispatch({ type: "SUCCESS", payload: null });
      router.push("/");
    } catch (error: any) {
      dispatch({ type: "FAILURE" });
    }
  };

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (!file.type.includes("image")) return alert("Please select an image");

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;

        setForm((prev) => ({ ...prev, image: result }));
      };
    },
    [setForm],
  );

  const handleChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { target } = e;

      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    },
    [setForm],
  );

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label
          htmlFor="poster"
          className="flexCenter form_image-label rounded-lg"
        >
          {!form.image && "Choose a poster for your project"}
          <input
            type="file"
            id="poster"
            name="image"
            accept="image/*"
            required={type === "create"}
            className="form_image-input"
            onChange={handleChangeImage}
          />
        </label>
        {form.image && (
          <>
            <Image
              src={form.image}
              fill
              className="object-contain sm:p-10"
              alt="Poster"
            />
            <div
              onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
              className="flexCenter absolute right-2 top-2 z-10 h-7 w-7 cursor-pointer rounded-full bg-red-200 p-0.5 text-red-800"
            >
              &#128473;
            </div>
          </>
        )}
      </div>
      {formSections.slice(1).map(({ id, placeholder, type, text }) => (
        <FormField
          key={id}
          name={id}
          title={text}
          type={type}
          isTextArea={id === "description"}
          value={form[id as keyof typeof form]}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ))}

      <CustomMenu
        filters={categoryFilters}
        value={form.category}
        onChange={(input) => setForm((prev) => ({ ...prev, category: input }))}
        title="Category"
        name="category"
      />

      <div className="flexStart w-full">
        <Button
          loading={isLoading}
          leftIcon={
            !isLoading && type === "create" ? "/assets/images/plus.svg" : null
          }
          type="submit"
          className="bg-primary-purple text-white"
        >
          {type === "create" ? "Add A Project" : "Save"}
        </Button>
      </div>
      {isError && (
        <p className="rounded-lg bg-red-100 px-4 py-1 text-red-600">
          Something went wrong!
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
