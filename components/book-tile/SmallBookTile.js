import * as React from "react";
import Image from "next/image";
import { Button, Typography, Stack, Box } from "@mui/material";

export default function SmallBookTile({ book }) {
  const handleClick = () => {};

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClick}>
          <Stack direction="column" spacing={1}>
            <Image
              src={book.img}
              alt={book.title}
              layout="intrinsic"
              width={180}
              height={240}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
              sx={{ textTransform: "capitalize" }}
            >
              {book.title}
            </Typography>
          </Stack>
        </Button>
      </Box>
    </>
  );
}
