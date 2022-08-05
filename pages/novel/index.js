import { Stack, Box } from "@mui/material";
import TabsComponent from "../../components/TabsComponent";
import CompleteNovelDetail from "./components/CompleteNovelDetail";

export default function Novel({ novelInfo }) {
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Stack
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CompleteNovelDetail novel={novelInfo} />
          <TabsComponent
            chapters={novelInfo.chapter_list}
            reviews={novelInfo.review_list}
            novel_id={novelInfo._id}
            author_id={novelInfo.author_id}
          />
        </Stack>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { novel_id } = context.query;
  if (!novel_id) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  const hostUrl = process.env.NEXTAUTH_URL;
  const requestUrl =
    hostUrl + "/api/novel/novel-info/" + encodeURIComponent(novel_id);
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
      novelInfo: novelInfo,
    },
  };
}
