import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import TabsComponentTemplate from "./TabsComponentTemplate";
import ReviewComponent from "./ReviewComponent";
import UserReviewField from "./UserReviewField";
import { signIn, useSession } from "next-auth/react";
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
  editing,
  handleEdit,
  handleCancel,
  handleUpdate,
  handleDelete,
}) => (
  <Box>
    {session && list.length === 0 && author_id !== session?.user.id ? (
      <Typography variant="body1" align="center" color="text.secondary" mb={3}>
        Be the first to review this novel.
      </Typography>
    ) : null}
    {!session ? (
      <Button
        disableRipple={true}
        variant="body1"
        onClick={signIn}
        mt={3}
        sx={{
          textTransform: "capitalize",
          textDecoration: "underline",
          "&:hover": { background: "inherit" },
        }}
      >
        Log in to leave a review.
      </Button>
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
        editing={editing}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
      />
    )}
    {session?.user.id === author_id && list.length === 0 && (
      <Typography variant="body1" align="center" color="text.secondary" mt={3}>
        No Reviews Yet.
      </Typography>
    )}
    {list.length > 0 ? (
      <ReviewComponent
        reviewList={list}
        handleEdit={handleEdit}
        editing={editing}
        handleDelete={handleDelete}
      />
    ) : null}
  </Box>
);

export default function NovelReviews({
  reviews,
  author_id,
  novel_id,
  descOrderReview,
  setDescOrderReview,
}) {
  const itemPerPage = 3;
  const [list, setList] = useState(reviews.slice(0, itemPerPage));
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const getRequestOptions = (requestData, requestType) => {
    return {
      method: requestType,
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  };

  const getRequestData = () => {
    return {
      user: session.user.id,
      novel: novel_id,
      rating: parseFloat(ratingValue),
      review: reviewValue,
    };
  };

  const handleReviewChange = (event) => {
    setReviewValue(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingValue(event.target.value);
  };

  const handleCloseAlert = (editing) => {
    setError(false);
    if (!editing) {
      setReviewValue("");
      setRatingValue(0);
    }
  };

  const handleEdit = (prevReview, prevRating) => {
    setReviewValue(prevReview);
    setRatingValue(prevRating);
    setEditing(true);
  };

  const handleCancel = () => {
    setReviewValue("");
    setRatingValue(0);
    setError(false);
    setEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = getRequestData();
    const res = await fetch(
      "/api/review/create-review",
      getRequestOptions(requestData, "POST")
    ).then((res) => res.json());
    setLoading(false);
    if (!res.success) {
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
    router.reload();
    return;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = getRequestData();

    const res = await fetch(
      "/api/review/update-review",
      getRequestOptions(requestData, "PUT")
    ).then((res) => res.json());
    if (!res.success) {
      setLoading(false);
      if (res.error === "review already exists") {
        setError(true);
        return;
      }
      if (res.error === "bad request") {
        router.push("/400");
        return;
      }
    }
    handleCancel();
    router.reload();
    return;
  };

  const handleDelete = async (review_id, user_id) => {
    setLoading(true);
    const requestData = {
      review_id: review_id,
      user_id: user_id,
    };

    const res = await fetch(
      "/api/review/delete-review",
      getRequestOptions(requestData, "DELETE")
    ).then((res) => res.json());
    if (!res.success) {
      setLoading(false);
      if (res.error === "unauthorized") {
        router.push("/401");
        return;
      }
      if (res.error === "bad request") {
        router.push("/400");
        return;
      }
    }
    router.reload();
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
            editing={editing}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        }
      />
    </>
  );
}
