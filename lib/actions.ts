import { ProjectForm } from "@/common.type";
import {
  categoriesQuery,
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    const res = await client.request(query, variables);
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);

    return res.json();
  } catch (error: any) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string,
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = (
  category?: string | null,
  endcursor?: string | null,
) => {
  client.setHeader("x-api-key", apiKey);

  const query = !category ? projectsQuery : categoriesQuery;

  return makeGraphQLRequest(query, { category, endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: number) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const editProject = async (
  form: ProjectForm,
  id: string,
  token: string,
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let input = { ...form };

  const isNewImage = isBase64DataURL(form.image);

  if (isNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      input = {
        ...form,
        image: imageUrl.url,
      };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id,
    input,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};
