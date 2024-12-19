import { create } from "zustand";
import { getBackendCookie } from "./cookies";
import axios from "axios";

interface Candidate {
  id: any;
  name: string;
  email: string;
  phoneNo: string;
  photo: string;
  gender: string;
  country: string;
  cv: string;
  dob: string;
  highestDegree: string;
  highestDegreeCGPA: number;
  yog: string;
  prevEmployer: string;
  experience: number;
  prevJobTitle: string;
  duration: string;
  isEmployed: boolean;
  skills: string;
  referralCode: string;
  referralName: string;
  links: string;
  jobRole: string;
  selected: boolean;
}

interface CandidateStore {
  candidates: Candidate[];
  fetchCandidatesByRoleID: (id: string) => Promise<void>;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  candidates: [],
  fetchCandidatesByRoleID: async (id: string) => {
    try {
      console.log("ID -> ", id);
      const backendCookie = await getBackendCookie();
      const data = await axios.get(
        `http://localhost:8080/allCandidate?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      set({ candidates: Array.isArray(data.data) ? data.data : [] });
    } catch (error) {
      console.error("Error while fetching -> ", error);
    }
  },
}));
