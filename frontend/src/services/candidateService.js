import api from "../utils/api";

export const uploadCandidateResume =
  async (formData) => {
    const response = await api.post(
      "/candidates/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

export const getAllCandidates =
  async () => {
    const response =
      await api.get("/candidates");

    return response.data;
  };

export const updateCandidateStatus =
  async (
    candidateId,
    recruitmentStatus
  ) => {
    const response = await api.put(
      `/candidates/${candidateId}/status`,
      {
        recruitmentStatus,
      }
    );

    return response.data;
  };

export const updateRecruiterNotes =
  async (
    candidateId,
    recruiterNotes
  ) => {
    const response = await api.put(
      `/candidates/${candidateId}/notes`,
      {
        recruiterNotes,
      }
    );

    return response.data;
  };