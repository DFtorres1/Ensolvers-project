import { generateQueryKeys } from "./functions";

const notesQueryKeys = generateQueryKeys("notes");
const usersQueryKeys = generateQueryKeys("users");
const tagsQueryKeys = generateQueryKeys("tags");

export { notesQueryKeys, usersQueryKeys, tagsQueryKeys };
