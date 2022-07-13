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
import { MENU_ITEMS } from "../constants/MENU_ITEMS";
import PageTitle from "./PageTitle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";

const FooterButton = ({ pages }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    mt={{ xs: 0.5, sm: 0 }}
    spacing={2}
    justifyContent="center"
  >
    {pages.map((page) => (
      <Button
        key={page.title}
        sx={{
          color: "white",
          display: "block",
          textTransform: "capitalize",
        }}
        href={page.href}
      >
        <Typography variant="body1">{page.title}</Typography>
      </Button>
    ))}
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
              <FooterButton pages={MENU_ITEMS} />
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
