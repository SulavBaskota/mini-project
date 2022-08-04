import { Box, Typography } from "@mui/material";
import { useState } from "react";
import TabsComponentTemplate from "./TabsComponentTemplate";
import ReviewComponent from "./ReviewComponent";
import UserReviewField from "./UserReviewField";
import { useSession } from "next-auth/react";

const NovelReviewsSubComponent = ({
  list,
  author_id,
  session,
  reviewValue,
  ratingValue,
  handleReviewChange,
  handleRatingChange,
}) => (
  <Box>
    {list.length === 0 && author_id !== session?.user.id ? (
      <Typography variant="body1" align="center" color="text.secondary" mt={3}>
        Be the first to review this novel!!!
      </Typography>
    ) : null}
    {session && session?.user.id !== author_id && (
      <UserReviewField
        reviewValue={reviewValue}
        ratingValue={ratingValue}
        handleReviewChange={handleReviewChange}
        handleRatingChange={handleRatingChange}
      />
    )}
    {session?.user.id === author_id && list.length === 0 && (
      <Typography variant="body1" align="center" color="text.secondary" mt={3}>
        No Reviews Yet!!!
      </Typography>
    )}
    {list.length > 0 ? <ReviewComponent reviewList={list} /> : null}
  </Box>
);

export default function NovelReviews({
  reviews,
  author_id,
  descOrderReview,
  setDescOrderReview,
}) {
  // Initial reviews array should be in descending order
  const itemPerPage = 3;
  const [list, setList] = useState(reviews.slice(0, itemPerPage));
  // reviewValue might need to be converted to JSON string while saving into database
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const { data: session } = useSession();

  const handleReviewChange = (event) => {
    setReviewValue(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingValue(event.target.value);
  };

  return (
    <>
      <TabsComponentTemplate
        itemList={reviews}
        itemPerPage={itemPerPage}
        setList={setList}
        descending={descOrderReview}
        setDescending={setDescOrderReview}
        subComponent={
          <NovelReviewsSubComponent
            list={list}
            author_id={author_id}
            session={session}
            reviewValue={reviewValue}
            ratingValue={ratingValue}
            handleReviewChange={handleReviewChange}
            handleRatingChange={handleRatingChange}
          />
        }
      />
    </>
  );
}
