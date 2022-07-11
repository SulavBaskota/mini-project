import {
  Container,
  Box,
  Typography,
  Divider,
  Button,
  FormLabel,
  Stack,
} from "@mui/material";
import ImageUpload from "../components/ImageUpload";
import CheckboxesTags from "../components/CheckboxesTags";

export default function EditNovelTemplate({
  pageTitle,
  imageLabel,
  buttonLink,
  buttonLabel,
  selectedGenres,
  setSelectedGenres,
  selectedImage,
  setSelectedImage,
  imageUrl,
  setImageUrl,
  textFieldComponents,
}) {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" mt={2}>
        {pageTitle}
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
              <Typography variant="h6">Novel Details</Typography>
            </FormLabel>
            {textFieldComponents}
            <Divider />
            <CheckboxesTags
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
            <Divider />
            <FormLabel>
              <Typography variant="h6">{imageLabel}</Typography>
            </FormLabel>
            <ImageUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
            <Divider />
            <Stack
              direction={{ xs: "row-reverse", md: "row" }}
              justifyContent="flex-end"
              spacing={2}
            >
              <Button href={`/${buttonLink}`} color="error" variant="outlined">
                Cancel
              </Button>
              <Button variant="contained">{buttonLabel}</Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
