import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { tagsQueryKeys } from "src/shared/utils/queryKeys";

const createTagRequest = async (tag: Tag) => {
  const { data } = await api.post("/tags/", tag);
  return data;
};

const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTag: Tag) => createTagRequest(newTag),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKeys.lists() });
    },
  });
};

export default useCreateTag;
