import { Box, Typography } from "@mui/material";
import { useState } from "react";
import TabsComponentTemplate from "./TabsComponentTemplate";
import ReviewComponent from "./ReviewComponent";
import UserReviewField from "./UserReviewField";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const NovelReviewsSubComponent = ({
  list,
  author_id,
  session,
  reviewValue,
  ratingValue,
  handleReviewChange,
  handleRatingChange,
  handleSubmit,
  error,
  handleCloseAlert,
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
        handleSubmit={handleSubmit}
        error={error}
        handleCloseAlert={handleCloseAlert}
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
  novel_id,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleReviewChange = (event) => {
    setReviewValue(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingValue(event.target.value);
  };

  const handleCloseAlert = () => {
    setError(false);
    setReviewValue("");
    setRatingValue(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {
      user: session.user.id,
      novel: novel_id,
      rating: parseFloat(ratingValue),
      review: reviewValue,
    };
    console.log(requestData);
    const res = await fetch("/api/review/create-review", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(res);
    setLoading(false);
    if (!res.ok) {
      if (res.error === "review already exists") {
        setError(true);
        setReviewValue("");
        setRatingValue(0);
        return;
      }
      if (res.error === "bad request") {
        router.push("/400");
        return;
      }
    }
    setReviewValue("");
    setRatingValue(0);
    router.push({
      pathname: "/novel",
      query: { novel_id: novel_id, tabValue: 1 },
    });
    return;
  };

  return (
    <>
      {loading && <Loader open={loading} />}
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
            handleSubmit={handleSubmit}
            error={error}
            handleCloseAlert={handleCloseAlert}
          />
        }
      />
    </>
  );
}
