import { useQuery } from "@tanstack/react-query";
import api from "src/shared/utils/api";
import { cleanObjectPropertiesAndEmpty } from "src/shared/utils/object";
import { tagsQueryKeys } from "src/shared/utils/queryKeys";

const getTagsList = async (searchParams: QueryParams): Promise<Tag[]> => {
  const { data } = await api.get(`/tags`, { params: searchParams });
  return data;
};

const useTagsList = (searchParams: QueryParams) => {
  const params = cleanObjectPropertiesAndEmpty(searchParams);
  return useQuery<Tag[]>({
    queryKey: tagsQueryKeys.filteredList(params),
    queryFn: async () => getTagsList(params),
    staleTime: 0,
    retry: 1,
  });
};

export default useTagsList
