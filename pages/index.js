import * as React from "react";
import Container from "@mui/material/Container";
import NewOngoingReleases from "../components/NewOngoingReleases";
import CompletedBooks from "../components/CompletedBooks";
export default function Index() {
  return (
    <Container>
      <NewOngoingReleases />
      <CompletedBooks />
    </Container>
  );
}
