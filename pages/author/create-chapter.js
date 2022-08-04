import {
  Container,
  Divider,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import Loader from "../../components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CreateChapter({ novel_title, novel_id, last_chapter }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChapterTitleChange = (event) => {
    setChapterTitle(event.target.value);
  };

  const handleChapterContentChange = (event) => {
    setChapterContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const requestData = {
      novel: novel_id,
      author: session.user.id,
      chapter_number: parseInt(last_chapter) + 1,
      title: chapterTitle,
      content: chapterContent,
    };

    console.log(requestData);
    const res = await fetch("/api/chapter/create-chapter", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setLoading(false);
    if (!res.ok) {
      router.push("/400");
      return;
    }
    router.push({
      pathname: "/novel",
      query: { novel_id: encodeURIComponent(novel_id) },
    });
  };

  return (
    <>
      {loading && <Loader open={loading} />}
      <Container sx={{ minHeight: "100vh" }}>
        <Typography variant="h5" mt={2}>
          Add New Chapter
        </Typography>
        <Divider sx={{ border: 1, mt: 2 }} />
        <Box
          component="form"
          autoComplete="off"
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onSubmit={handleSubmit}
        >
          <Box sx={{ width: 900, maxWidth: "100%" }}>
            <Stack spacing={2}>
              <FormLabel>
                <Typography variant="h6">Chapter Details</Typography>
              </FormLabel>
              <Divider />
              <TextField
                id="novelName"
                label="Novel Title"
                InputProps={{
                  readOnly: true,
                }}
                value={novel_title}
              />
              <TextField
                id="chapterId"
                label="Chapter Number"
                InputProps={{
                  readOnly: true,
                }}
                value={parseInt(last_chapter) + 1}
              />
              <TextField
                required
                id="chapterTitle"
                label="Chapter Title"
                placeholder="Add Title"
                onChange={handleChapterTitleChange}
              />
              <TextField
                required
                id="chapterContent"
                label="Chapter Content"
                placeholder="Add Chapter Content"
                multiline
                rows={15}
                onChange={handleChapterContentChange}
              />
              <Divider />
              <Stack
                direction={{ xs: "row-reverse", md: "row" }}
                justifyContent="flex-end"
                spacing={2}
              >
                <Button
                  href={`/novel?novel_id=${encodeURIComponent(novel_id)}`}
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    chapterTitle == "" || chapterContent == "" ? true : false
                  }
                >
                  Add Chapter
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { novel_title, novel_id, last_chapter } = context.query;
  if (!novel_title || !novel_id || !last_chapter) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
  return {
    props: {
      novel_title: decodeURIComponent(novel_title),
      novel_id: novel_id,
      last_chapter: last_chapter,
    },
  };
}
