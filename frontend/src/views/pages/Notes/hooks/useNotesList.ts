import { useQuery } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { cleanObjectPropertiesAndEmpty } from "src/shared/utils/object";
import { notesQueryKeys } from "src/shared/utils/queryKeys";

const getNotesList = async (searchParams: QueryParams): Promise<Note[]> => {
  const { data } = await api.get(`/notes`, { params: searchParams });
  return data;
};

const useNotesList = (searchParams: QueryParams) => {
  const params = cleanObjectPropertiesAndEmpty(searchParams);

  return useQuery<Note[]>({
    queryKey: notesQueryKeys.filteredList(params),
    queryFn: async () => getNotesList(params),
    staleTime: 0,
    retry: 1,
  });
};

export default useNotesList;
