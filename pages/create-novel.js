import {
  Container,
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  FormLabel,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import CheckboxesTags from "../components/CheckboxesTags";

export default function CreateNovel() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        Create New Novel
      </Typography>
      <Divider sx={{ border: 1, mt: 2 }} />
      <Box component="form" noValidate autoComplete="off" mt={2}>
        <Stack spacing={2}>
          <FormLabel>
            <Typography variant="h6">Novel Details</Typography>
          </FormLabel>
          <TextField required id="name" label="Novel Name" />
          <TextField
            required
            id="synopsis"
            label="Novel Description"
            multiline
            rows={5}
          />
          <CheckboxesTags
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Divider />
          <FormLabel>
            <Typography variant="h6">Upload Book Cover Art</Typography>
          </FormLabel>
          <ImageUpload />
          <Divider />
          <Stack
            direction={{ xs: "row-reverse", md: "row" }}
            justifyContent="flex-end"
            spacing={2}
          >
            <Button href="/my-novels" color="error" variant="outlined">
              Cancel
            </Button>
            <Button variant="contained">Create Novel</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
