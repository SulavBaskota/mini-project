import {
  Container,
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  FormLabel,
  Stack,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { NOVEL } from "../constants/NOVEL";
import ImageUpload from "../components/ImageUpload";
import RadioGroupComponent from "../components/RadioButtonComponent";
import CheckboxesTags from "../components/CheckboxesTags";

const status = ["Ongoing", "Completed", "Hiatus"];

export default function EditNovel() {
  const novel = NOVEL;
  const [statusValue, setStatusValue] = useState(novel.status);
  const [selectedGenres, setSelectedGenres] = useState(novel.genre);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        Edit Novel
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Box component="form" noValidate autoComplete="off" mt={2}>
        <Stack spacing={2}>
          <FormLabel>
            <Typography variant="h6">Novel Details</Typography>
          </FormLabel>
          <TextField id="name" label="Novel Name" value={novel.title} />
          <TextField
            id="synopsis"
            label="Novel Description"
            value={novel.desc}
            multiline
          />
          <FormControl>
            <RadioGroupComponent
              id="status"
              label="Status"
              value={statusValue}
              itemList={status}
              setValue={setStatusValue}
            />
          </FormControl>
          <Divider />
          <CheckboxesTags
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Divider />
          <FormLabel>
            <Typography variant="h6">Upload New Book Cover Art</Typography>
          </FormLabel>
          <ImageUpload />
          <Divider />
          <Stack
            direction={{ xs: "row-reverse", md: "row" }}
            justifyContent="flex-end"
            spacing={2}
          >
            <Button href="/novel" color="error" variant="outlined">
              Cancel
            </Button>
            <Button variant="contained">Save Changes</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
