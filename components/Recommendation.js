import { Stack, Rating, Typography } from "@mui/material";

export default function Recommendation({ title, rating, recommendation }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={1}
    >
      <Typography
        variant="subtitle1"
        color={(theme) => theme.palette.success.main}
        fontWeight="bold"
        textTransform="capitalize"
      >
        {recommendation}
      </Typography>
      <Rating
        name={title}
        size="small"
        value={parseFloat(rating)}
        precision={0.1}
        readOnly
      />
      <Typography
        variant="subtitle1"
        color="secondary.light"
        sx={{ textDecoration: "underline" }}
      >
        {rating} stars
      </Typography>
    </Stack>
  );
}
