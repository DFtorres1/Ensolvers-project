import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { notesQueryKeys } from "src/shared/utils/queryKeys";

const createNoteRequest = async (note: Note) => {
  const { data } = await api.post("/notes/", note);
  return data;
};

const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newNote: Note) => createNoteRequest(newNote),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.lists() });
    },
  });
};

export default useCreateNote;
