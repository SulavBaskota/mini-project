import React from "react";
import { Box, Stack, Avatar, Typography } from "@mui/material";

const UserPostAccountInfo = ({ info }) => {
  const convertToLocalString = (date) => {
    return new Date(date).toLocaleString();
  };
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          {info.user.imgUrl ? (
            <Avatar src={info.user.imgUrl} alt={info.user.username} />
          ) : (
            <Avatar>{info.user.username.slice(0, 2).toUpperCase()}</Avatar>
          )}
          <Typography variant="h6">{info.user.username}</Typography>
        </Stack>
        <Typography variant="subtitle2" color="secondary.light">
          {convertToLocalString(info.date)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default UserPostAccountInfo;
