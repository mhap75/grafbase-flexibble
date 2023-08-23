import { ProjectInterface } from "@/common.type";
import { fetchAllProjects } from "@/lib/actions";
import { useEffect, useReducer } from "react";

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

const initial = {
  isLoading: false,
  isError: false,
  data: null,
};

const fetch = (
  state: typeof initial,
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

export const useProjects = () => {
  const [state, dispatch] = useReducer(fetch, initial);

  const fetchProjects = async () => {
    dispatch({ type: "PENDING" });
    try {
      const data = (await fetchAllProjects()) as ProjectSearch;
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error });
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return state;
};
