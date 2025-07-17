import { METHODS } from "../constants";
import client from "./client";

export const api = {
  USERS: {
    get_all: () => client({ url: "/users" }),
    get_by_id: (id) => client({ url: `/users/${id}` }),
    create: ({ data }) => client({ method: METHODS.POST, url: "/users", data }),
    delete: ({ id }) => client({ method: METHODS.DELETE, url: `/users/${id}` }),
    update: ({ id, data }) =>
      client({ method: METHODS.PUT, url: `/users/${id}`, data }),
  },
  TASKS: {
    get_all: () => client({ url: "/tasks" }),
    get_by_id: ({ id }) => client({ url: `/tasks/${id}` }),
    create: ({ data }) => client({ method: METHODS.POST, url: "/tasks", data }),
    delete: ({ id }) => client({ method: METHODS.DELETE, url: `/tasks/${id}` }),
    update: ({ id, data }) =>
      client({ method: METHODS.PUT, url: `/tasks/${id}`, data }),
  },
  AUTH: {
    login: ({ data }) =>
      client({ method: METHODS.POST, url: "/user/login", data }),
    register: ({ data }) =>
      client({ method: METHODS.POST, url: "/user/register", data }),
  },
};
