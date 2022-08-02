import * as React from "react";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import NewOngoingReleases from "./components/NewOngoingReleases";
import CompletedBooks from "./components/CompletedBooks";
import PopularNovels from "./components/PopularNovels";
import RecentlyUpdated from "./components/recently-updated";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Container
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
        minHeight: "100vh",
      }}
    >
      {session && console.log(session)}
      <NewOngoingReleases />
      <PopularNovels />
      <CompletedBooks />
      <RecentlyUpdated />
    </Container>
  );
}
