import { create } from "zustand";
import { getBackendCookie } from "./cookies";
import axios, { AxiosResponse } from "axios";

interface Candidate {
  id: string;
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
  selected: string;
}

interface CandidateStore {
  candidate: Candidate;
  candidates: Candidate[];
  fetchCandidatesByRoleID: (id: string) => Promise<void>;
  fetchCandidateInfo: (roleid: string, candidateid: string) => Promise<void>;
  rejectCandidate: (candidateid: string) => Promise<void>;
  acceptCandidate: (candidateid: string) => Promise<void>;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  candidates: [],
  candidate: {
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    photo: "",
    gender: "",
    country: "",
    cv: "",
    dob: "",
    highestDegree: "",
    highestDegreeCGPA: 0,
    yog: "",
    prevEmployer: "",
    experience: 0,
    prevJobTitle: "",
    duration: "",
    isEmployed: false,
    skills: "",
    referralCode: "",
    referralName: "",
    links: "",
    jobRole: "",
    selected: "",
  },
  fetchCandidatesByRoleID: async (id: string) => {
    try {
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
  fetchCandidateInfo: async (roleid: string, candidateid: string) => {
    try {
      const backendCookie = await getBackendCookie();
      const data: AxiosResponse<any, any> = await axios.get(
        `http://localhost:8080/singleCandidate?candidateId=${candidateid}&roleId=${roleid}`,
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      set({ candidate: data.data });
    } catch (error) {
      console.error("Error while fetching candidate details -> ", error);
    }
  },
  rejectCandidate: async (candidateid: string) => {
    try {
      const backendCookie = await getBackendCookie();
      await axios.put(
        `http://localhost:8080/rejectCandidate?id=${candidateid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === candidateid
            ? { ...candidate, selected: "reject" }
            : candidate
        ),
      }));
      set((state) => ({
        candidate: { ...state.candidate, selected: "reject" },
      }));
    } catch (error) {
      console.log(error);
    }
  },
  acceptCandidate: async (candidateid: string) => {
    try {
      const backendCookie = await getBackendCookie();
      await axios.put(
        `http://localhost:8080/selectCandidate?id=${candidateid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${backendCookie}`,
          },
        }
      );
      set((state) => ({
        candidates: state.candidates.map((candidate) =>
          candidate.id === candidateid
            ? { ...candidate, selected: "accept" }
            : candidate
        ),
      }));
      set((state) => ({
        candidate: { ...state.candidate, selected: "accept" },
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
