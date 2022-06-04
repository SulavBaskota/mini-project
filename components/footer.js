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
import { USEFUL_LINKS } from "../constants/USEFUL_LINKS";
import PageTitle from "./PageTitle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const FooterButton = ({ pages }) =>
  pages.map((page) => (
    <Button
      key={page.title}
      sx={{
        my: 2,
        color: "white",
        display: "block",
        textTransform: "capitalize",
      }}
      href={page.href}
    >
      <Typography>{page.title}</Typography>
    </Button>
  ));

export default function Footer() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box component={Paper} mt={10}>
      <Container>
        <Box sx={{ flexGrow: 1, paddingBottom: 4 }}>
          <Grid
            container
            direction={mobileView ? "column-reverse" : "row"}
            justifyContent="flex-start"
            alignItems={mobileView ? "flex-start" : "center"}
            spacing={4}
          >
            <Grid item sm={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                marginBottom={2}
              >
                <PageTitle variant={"h6"} mr={4} flexGrow={0}/>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                marginLeft={-1}
                marginBottom={2}
              >
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Stack>
              <Copyright />
            </Grid>
            <Grid container item sm={8} spacing={4}>
              <Grid item>
                <FooterButton pages={USEFUL_LINKS} />
              </Grid>
              <Grid item>
                <FooterButton pages={MENU_ITEMS} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
