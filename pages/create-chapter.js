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
import { NOVEL } from "../constants/NOVEL";

export default function CreateChapter() {
  const novel = NOVEL;
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");

  const handleChapterTitleChange = (event) => {
    setChapterTitle(event.target.value);
  };

  const handleChapterContentChange = (event) => {
    setChapterContent(event.target.value);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        Add New Chapter
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
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
              value={novel.title}
            />
            <TextField
              id="chapterId"
              label="Chapter Number"
              InputProps={{
                readOnly: true,
              }}
              value={parseInt(novel.latestChapter) + 1}
            />
            <TextField
              id="chapterTitle"
              label="Chapter Title"
              placeholder="Add Title"
              onChange={handleChapterTitleChange}
            />
            <TextField
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
              <Button href="/novel" color="error" variant="outlined">
                Cancel
              </Button>
              <Button
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
  );
}
