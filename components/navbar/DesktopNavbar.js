import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PageTitle from "../PageTitle";
import { useSession } from "next-auth/react";

export default function DesktopNavbar() {
  const { data: session } = useSession();
  return (
    <>
      <PageTitle variant={"h6"} mr={4} flexGrow={18} />
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Button
          disableRipple={true}
          sx={{
            my: 2,
            color: "white",
            display: "block",
            "&:hover": {
              background: "inherit",
            },
          }}
          href="/series"
        >
          Series
        </Button>
        <Button
          disableRipple={true}
          sx={{
            my: 2,
            color: "white",
            display: "block",
            "&:hover": {
              background: "inherit",
            },
          }}
          href="/user/bookmarks"
        >
          Bookmarks
        </Button>
        {session?.user.userrole === "author" && (
          <Button
            disableRipple={true}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              "&:hover": {
                background: "inherit",
              },
            }}
            href="/author/my-novels"
          >
            My Novels
          </Button>
        )}
      </Box>
    </>
  );
}
