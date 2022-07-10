import { Box } from "@mui/material";
import { useState } from "react";
import TabsComponentTemplate from "./TabsComponentTemplate";
import ReviewComponent from "./ReviewComponent";
import UserReviewField from "./UserReviewField";

const NovelReviewsSubComponent = ({
  list,
  reviewValue,
  ratingValue,
  handleReviewChange,
  handleRatingChange,
}) => (
  <Box>
    <UserReviewField
      reviewValue={reviewValue}
      ratingValue={ratingValue}
      handleReviewChange={handleReviewChange}
      handleRatingChange={handleRatingChange}
    />
    <ReviewComponent reviewList={list} />
  </Box>
);

export default function NovelReviews({
  reviews,
  descOrderReview,
  setDescOrderReview,
}) {
  // Initial reviews array should be in descending order
  const itemPerPage = 5;
  const [list, setList] = useState(reviews.slice(0, itemPerPage));
  // reviewValue might need to be converted to JSON string while saving into database
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

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
