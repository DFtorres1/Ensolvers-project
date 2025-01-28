import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { notesQueryKeys } from "src/shared/utils/queryKeys";

type UpdateNoteProps = {
  noteId: number;
  note: Note;
};

const updateNoteRequest = async ({ noteId, note }: UpdateNoteProps) => {
  return api.put(`/notes/${noteId}`, note);
};

const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, note }: UpdateNoteProps) =>
      updateNoteRequest({ noteId, note }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.lists() });
    },
  });
};

export default useUpdateNote;
