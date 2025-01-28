import { useEffect, useState } from "react";
import {
  getDefaultCriteria,
  getPaginationConfig,
  removeSessionToken,
} from "src/shared/utils/functions";
import useNotesList from "./hooks/useNotesList";
import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  Grid2,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import NoteItem from "./NoteItem";
import { FaArchive } from "react-icons/fa";
import { MdClose, MdLogout, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const paginationConfig: Partial<Config> = getPaginationConfig("id");

const Search = styled("div")(() => ({
  position: "absolute",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF11",
  "&:hover": {
    backgroundColor: "#FFFFFF33",
  },
  right: "60px",
}));

const Notes = () => {
  const [noteFormDialog, setNoteFormDialog] = useState<boolean>(false);
  const [archiveView, setArchiveView] = useState<boolean>(false);
  const [criteria, setCriteria] = useState<QueryParams>({
    ...getDefaultCriteria(paginationConfig),
    archiveView,
  });

  const navigate = useNavigate();

  const { data, refetch, isLoading } = useNotesList(criteria) ?? { data: null };

  const handleDialogOpen = () => {
    setNoteFormDialog((prev) => !prev);
  };

  const handleLogOut = () => {
    removeSessionToken();
    navigate("/login");
  };

  const handleToggleArchiveView = () => {
    setArchiveView((prev) => !prev);
  };

  useEffect(() => {
    setCriteria({ ...getDefaultCriteria(paginationConfig), archiveView });
    refetch();
  }, [refetch, archiveView, setCriteria]);

  if (isLoading) {
    return <div>Loading content</div>;
  }

  return (
    <Box padding={3}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#333333" }}>
          <Toolbar>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleDialogOpen}
            >
              Add note
            </Button>
            <IconButton
              aria-label="close"
              onClick={handleToggleArchiveView}
              sx={{
                color: "#CCCCCC",
              }}
            >
              <FaArchive />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={handleLogOut}
              sx={{
                position: "absolute",
                right: 8,
                top: 12,
                color: "#CCCCCC",
              }}
            >
              <MdLogout />
            </IconButton>
            <Search>
              <div
                style={{
                  height: "100%",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "8px",
                }}
              >
                <MdSearch />
              </div>
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                style={{ color: "inherit", width: "100%", paddingLeft: "30px" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog onClose={handleDialogOpen} open={noteFormDialog}>
        <Box p={2}>
          <Typography>Create a note</Typography>
          <IconButton
            aria-label="close"
            onClick={handleDialogOpen}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <MdClose />
          </IconButton>
        </Box>

        <Card variant="outlined">
          <NoteItem setDialogOpen={setNoteFormDialog} />
        </Card>
      </Dialog>

      <Grid2 container spacing={2} paddingTop={8}>
        {data?.length ? (
          data.map((note: Note) => (
            <Grid2
              key={note.id}
              size={{ xs: 8, sm: 6, md: data?.length > 2 ? 4 : 6 }}
              sx={{ width: "fit-content" }}
            >
              <Card variant="outlined">
                <NoteItem note={note} />
              </Card>
            </Grid2>
          ))
        ) : (
          <div>There is nothing to show</div>
        )}
      </Grid2>
    </Box>
  );
};

export default Notes;
