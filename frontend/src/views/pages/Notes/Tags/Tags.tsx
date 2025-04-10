import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useTagsList from "./hooks/useTagsList";
import { useCallback, useEffect, useState } from "react";
import {
  getDefaultCriteria,
  getPaginationConfig,
} from "src/shared/utils/functions";
import TagChip from "./TagTooltip";
import { GrAddCircle } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCreateTag from "./hooks/useCreateTag";

type TagsProps = {
  isOpen: boolean;
  setOpen: () => void;
  inNote?: boolean;
  handleAddTag?: (tags?: number[]) => void;
};

const paginationConfig: Partial<Config> = getPaginationConfig("id");

const Tags = ({ isOpen, setOpen, inNote, handleAddTag }: TagsProps) => {
  const [createTagDialog, setCreateTagDialog] = useState<boolean>(false);
  const [criteria, setCriteria] = useState<QueryParams>({
    ...getDefaultCriteria(paginationConfig),
  });

  const { data, refetch, isLoading } = useTagsList(criteria) ?? { data: null };
  const {
    mutate: handleCreateTag,
    isSuccess: createSuccess,
    isPending: createLoading,
  } = useCreateTag();

  const defaultValues = {
    name: "",
    color: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("The tag needs a name"),
        color: yup.string(),
      })
    ),
  });

  const onSubmit = useCallback(
    async (values: Tag) => {
      const tagForm: Tag = {
        ...values,
      };
      handleCreateTag(tagForm);
    },
    [handleCreateTag]
  );

  useEffect(() => {
    setCriteria({ ...getDefaultCriteria(paginationConfig) });
    refetch();
  }, [refetch, setCriteria]);

  useEffect(() => {
    if (createSuccess && setCreateTagDialog) {
      reset();
      setCreateTagDialog(false);
    }
  }, [createSuccess, setCreateTagDialog, reset]);

  const handleCreateTagDialogOpen = () => {
    setCreateTagDialog((prev) => !prev);
  };

  if (isLoading) {
    return <div>Loading content</div>;
  }

  return (
    <Dialog fullWidth onClose={setOpen} open={isOpen}>
      <DialogContent
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <IconButton
          onClick={handleCreateTagDialogOpen}
          sx={{
            color: "#CCCCCC",
          }}
        >
          <GrAddCircle />
        </IconButton>
        <Typography>{inNote ? "Add tag" : "Tags"}</Typography>
        <IconButton
          aria-label="close"
          onClick={setOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <MdClose />
        </IconButton>
      </DialogContent>

      <Divider />

      <DialogContent>
        <Grid2 container spacing={2}>
          {data?.length ? (
            data.map((tag: Tag) => (
              <Grid2
                key={tag.id}
                size={{ xs: 3, sm: 3, md: 3 }}
                sx={{ width: "fit-content" }}
              >
                <TagChip
                  tag={tag}
                  {...(inNote ? { handleClick: handleAddTag } : {})}
                />
              </Grid2>
            ))
          ) : (
            <div>There is nothing to show</div>
          )}
        </Grid2>

        <Dialog open={createTagDialog} onClose={handleCreateTagDialogOpen}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Box p={2}>
                  <Grid2 container spacing={1}>
                    <Grid2 style={{ width: "100%" }}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            variant="standard"
                            style={{ width: "100%" }}
                            label={"Name"}
                            {...field}
                          />
                        )}
                      />
                    </Grid2>
                    <Grid2 style={{ width: "100%" }}>
                      <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            variant="standard"
                            style={{ width: "100%" }}
                            label={"Color"}
                            {...field}
                          />
                        )}
                      />
                    </Grid2>
                  </Grid2>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disabled={createLoading}
                  type="submit"
                >
                  Save
                </Button>
              </CardActions>
            </form>
          </Card>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default Tags;
