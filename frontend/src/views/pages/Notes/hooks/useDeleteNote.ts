import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { notesQueryKeys } from "src/shared/utils/queryKeys";

type DeleteNoteProps = {
  noteId: number;
};

const deleteNoteRequest = async ({ noteId }: DeleteNoteProps) => {
  return api.delete(`/notes/${noteId}`);
};

const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: DeleteNoteProps) =>
        deleteNoteRequest({ noteId }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.lists() });
    },
  });
};

export default useDeleteNote;
