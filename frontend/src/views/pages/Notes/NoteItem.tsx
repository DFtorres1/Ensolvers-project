import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid2,
  TextField,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useUpdateNote from "./hooks/useUpdateNote";
import useCreateNote from "./hooks/useCreateNote";
import { MdArchive, MdUnarchive } from "react-icons/md";

type NoteItemProps = {
  note?: Note;
  setDialogOpen?: Dispatch<SetStateAction<boolean>>;
};

const NoteItem = ({ note, setDialogOpen }: NoteItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(note ? false : true);

  const { mutate: handleUpdateNote, isPending: updateLoading } =
    useUpdateNote();
  const {
    mutate: handleCreateNote,
    isSuccess: createSuccess,
    isPending: createLoading,
  } = useCreateNote();

  const defaultValues = {
    id: note?.id ?? 0,
    title: note?.title ?? "",
    content: note?.content ?? "",
    isActive: note?.isActive ?? true,
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required("The note needs a title"),
        content: yup.string().required("The note needs some content"),
        isActive: yup.boolean(),
      })
    ),
  });

  const onSubmit = useCallback(
    async (values: Note) => {
      const noteForm: Note = {
        ...values,
      };
      if (note) {
        setEditMode(false);
        handleUpdateNote({ noteId: note?.id ?? 0, note: noteForm });
      } else {
        handleCreateNote(noteForm);
      }
    },
    [
      handleUpdateNote,
      handleCreateNote,
      note,
    ]
  );

  useEffect(() => {
    if (createSuccess && setDialogOpen) {
      reset();
      setDialogOpen(false);
    }
  }, [createSuccess, setDialogOpen, reset]);

  const handleEditNote = () => {
    setEditMode((prev) => !prev);
  };

  const handleArchiveNote = (active: boolean) => {
    handleUpdateNote({ noteId: note?.id ?? 0, note: { isActive: active } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent style={{ color: note?.isActive ? "FFFFFF" : "FAFAFA" }}>
          <Grid2 container spacing={1}>
            <Grid2 style={{ width: "100%" }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    className={`override-text-field title ${
                      !editMode && "view-mode"
                    }`}
                    style={{ width: "100%" }}
                    disabled={!editMode}
                    label={"Title"}
                    {...field}
                  />
                )}
              />
            </Grid2>
            <Grid2 style={{ width: "100%" }}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="standard"
                    className={`override-text-field ${
                      !editMode && "view-mode"
                    }`}
                    style={{ width: "100%" }}
                    disabled={!editMode}
                    label={"Content"}
                    multiline
                    rows={3}
                    {...field}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </CardContent>
        <CardActions>
          {note && (
            <Box
              style={{ width: "100%" }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {note.isActive && (
                <Button disabled={updateLoading} onClick={handleEditNote}>
                  {editMode ? "Cancel" : "Edit"}
                </Button>
              )}
              {!editMode && (
                <Button
                  startIcon={note.isActive ? <MdArchive /> : <MdUnarchive />}
                  disabled={updateLoading}
                  onClick={() =>
                    handleArchiveNote(note.isActive ? false : true)
                  }
                >
                  {note.isActive ? "Archive" : "Unarchive"}
                </Button>
              )}
            </Box>
          )}
          {(editMode || !note) && (
            <Button
              variant="contained"
              disabled={updateLoading || createLoading}
              type="submit"
            >
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </>
  );
};

export default NoteItem;
