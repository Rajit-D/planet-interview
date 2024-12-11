import { create } from "zustand";
import axios from "axios";
import { getBackendCookie } from "./cookies";

interface Role {
  id: any;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: any;
}

interface RoleStore {
  roles: Role[];
  fetchRoles: () => Promise<void>;
  addRole: (newRole: Role) => void;
  deleteRole: (roleId: string) => Promise<void>;
}

export const useRoleStore = create<RoleStore>((set) => ({
  roles: [],
  fetchRoles: async () => {
    try {
      const backendCookie = await getBackendCookie();
      const res = await axios.get("http://localhost:8080/allJobRole", {
        headers: {
          Authorization: `Bearer ${backendCookie}`,
        },
      });
      set({ roles: res.data });
    } catch (error) {
      console.log("Error while fetching -> ", error);
    }
  },
  addRole: async (newRole: Role) => {
    try {
      const backendCookie = await getBackendCookie();
      const res = await axios.post(
        "http://localhost:8080/addJobRole",
        {
          id: newRole.id,
          name: newRole.name,
          skills: newRole.skills,
          experience: newRole.experience,
          minATS: newRole.minATS,
          createdBy: newRole.createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      const role = res.data;
      set((state) => ({
        roles: [...state.roles, role],
      }));
      console.log("Role added successfully ✅");
    } catch (error) {
      console.log("Error while adding -> ", error);
    }
  },
  deleteRole: async (roleId: string) => {
    try {
      const backendCookie = await getBackendCookie();
      await axios.delete(`http://localhost:8080/deleteJobRole?id=${roleId}`, {
        headers: {
          Authorization: `Bearer ${backendCookie}`,
        },
      });
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== roleId),
      }));
    } catch (error) {
      console.error("Error while deleting role ->", error);
    }
  },
}));
