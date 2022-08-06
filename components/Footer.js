import {
  Paper,
  Typography,
  Button,
  Box,
  Stack,
  Grid,
  Container,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Copyright from "../src/Copyright";
import PageTitle from "./PageTitle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import { useSession } from "next-auth/react";

const FooterButton = ({ session }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={{ sm: 2 }}
    justifyContent="center"
  >
    <Button
      disableRipple={true}
      sx={{
        color: "white",
        display: "block",
        textTransform: "capitalize",
        "&:hover": { background: "inherit" },
      }}
      href="/series"
    >
      <Typography variant="body1">Series</Typography>
    </Button>
    <Button
      disableRipple={true}
      sx={{
        color: "white",
        display: "block",
        textTransform: "capitalize",
        "&:hover": { background: "inherit" },
      }}
      href="/user/bookmarks"
    >
      <Typography variant="body1">Bookmarks</Typography>
    </Button>
    {session?.user.userrole === "author" && (
      <Button
        disableRipple={true}
        sx={{
          color: "white",
          display: "block",
          textTransform: "capitalize",
          "&:hover": { background: "inherit" },
        }}
        href="/author/my-novels"
      >
        <Typography variant="body1">My Novels</Typography>
      </Button>
    )}
  </Stack>
);

const SocialMediaLinksComponent = () => (
  <Stack
    direction="row"
    ml={{ xs: -1, sm: 0 }}
    alignItems="center"
    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
  >
    <IconButton>
      <FacebookIcon />
    </IconButton>
    <IconButton>
      <TwitterIcon />
    </IconButton>
    <IconButton>
      <RedditIcon />
    </IconButton>
  </Stack>
);

export default function Footer() {
  const { data: session } = useSession();
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box component={Paper} mt={10}>
      <Container>
        <Box sx={{ flexGrow: 1, paddingBottom: 4 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={4}
          >
            <Grid item xs={6} sm={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <PageTitle variant={"h6"} mr={0} flexGrow={0} />
              </Stack>
              {mobileView && <SocialMediaLinksComponent />}
            </Grid>
            <Grid item xs={6} sm={6}>
              <FooterButton session={session} />
            </Grid>
            {!mobileView && (
              <Grid item sm={3}>
                <SocialMediaLinksComponent />
              </Grid>
            )}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Copyright />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
