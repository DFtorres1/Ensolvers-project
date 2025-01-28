import { generateQueryKeys } from "./functions";

const notesQueryKeys = generateQueryKeys("notes");
const usersQueryKeys = generateQueryKeys("users");

export { notesQueryKeys, usersQueryKeys };
