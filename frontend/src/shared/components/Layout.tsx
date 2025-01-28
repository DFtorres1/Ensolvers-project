import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
          minWidth: "100vw",
          minHeight: "100vh",
          height: "100%",
          backgroundColor: "#333333",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
