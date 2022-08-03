import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MyNovels({ novelList }) {
  const router = useRouter();
  console.log(novelList);
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h5">My Novels</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/author/create-novel"
        >
          Create New Novel
        </Button>
      </Stack>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Grid container columns={{ xs: 1, sm: 2, md: 2 }} spacing={3} mt={2}>
        {novelList.map((novel, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <Card>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={novel.img}
                    alt={novel.title}
                    height="230"
                    sx={{ objectFit: "fill" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {novel.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textTransform: "capitalize" }}
                      >
                        Status: {novel.status}
                      </Typography>
                      <Stack direction="row" spacing={0.5}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="left"
                        >
                          Rating:
                        </Typography>
                        <Rating
                          name={novel.title}
                          size="small"
                          value={parseFloat(novel.rating)}
                          precision={0.1}
                          readOnly
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Current Chapter: {novel.last_chapter}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Updated On: {novel.updated_on}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          router.push({
                            pathname: "/novel",
                            query: { novel_id: encodeURIComponent(novel._id) },
                          })
                        }
                      >
                        Update
                      </Button>
                    </CardActions>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  const hostUrl = process.env.NEXTAUTH_URL;
  const requestUrl =
    hostUrl + "/api/novel/get-my-novels/" + encodeURIComponent(session.user.id);
  let novelInfo = {};
  await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (novelInfo = res.data));

  return {
    props: {
      novelList: novelInfo,
    },
  };
}
