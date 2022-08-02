import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";

export default function RecentlyUpdatedDesktop({ updateList }) {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Release</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updateList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="intrinsic"
                      width={30}
                      height={40}
                    />
                    <Typography>{item.title}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography>
                    Chapter {item.chapter} : {item.chapterTitle}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.author}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.time}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
