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

interface FullRole {
  id: any;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: any;
  expired: boolean;
  createdAt: any;
  updatedAt: any;
}

interface RoleStore {
  roles: Role[];
  fetchRoles: () => Promise<void>;
  addRole: (newRole: Role) => void;
  deleteRole: (roleId: string) => Promise<void>;
  updateRole: (updatedRole: FullRole) => Promise<void>;
  expireRole: (roleId: string) => Promise<void>;
}

export const useRoleStore = create<RoleStore>((set) => ({
  roles: [],
  fetchRoles: async () => {
    try {
      const backendCookie = await getBackendCookie();
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/allJobRole`, {
        headers: {
          Authorization: `Bearer ${backendCookie}`,
        },
      });
      set({ roles: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      console.log("Error while fetching -> ", error);
    }
  },
  addRole: async (newRole: Role) => {
    try {
      const backendCookie = await getBackendCookie();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/addJobRole`,
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
        roles: Array.isArray(state.roles) ? [...state.roles, role] : [role],
      }));
      console.log("Role added successfully ✅");
    } catch (error) {
      console.log("Error while adding -> ", error);
    }
  },
  deleteRole: async (roleId: string) => {
    try {
      const backendCookie = await getBackendCookie();
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_PATH}/deleteJobRole?id=${roleId}`, {
        headers: {
          Authorization: `Bearer ${backendCookie}`,
        },
      });
      set((state) => ({
        roles: Array.isArray(state.roles)
          ? state.roles.filter((role) => role.id !== roleId)
          : [],
      }));
    } catch (error) {
      console.error("Error while deleting role ->", error);
    }
  },
  updateRole: async (updatedRole: FullRole) => {
    try {
      const backendCookie = await getBackendCookie();
      const updated = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/updateJobRole`,
        {
          id: updatedRole.id,
          name: updatedRole.name,
          skills: updatedRole.skills,
          experience: updatedRole.experience,
          minATS: updatedRole.minATS,
          createdBy: updatedRole.createdBy,
          expired: updatedRole.expired,
          createdAt: updatedRole.createdAt,
          updatedAt: updatedRole.updatedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === updatedRole.id ? { ...role, ...updated.data } : role
        ),
      }));
    } catch (error) {
      console.error("Error while editing -> ", error);
    }
  },
  expireRole: async (roleId: string) => {
    try {
      const backendCookie = await getBackendCookie();
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/expireJobRole?id=${roleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );

      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === roleId ? { ...role, expired: true } : role
        ),
      }));
    } catch (error) {
      console.error("Error while expiring role ->", error);
    }
  },
}));
