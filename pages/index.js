import * as React from "react";
import Home from "./home";

export default function Index({
  newNovels,
  popularNovels,
  completedNovels,
  recentlyUpdated,
}) {
  return (
    <Home
      newNovels={newNovels}
      popularNovels={popularNovels}
      completedNovels={completedNovels}
      recentlyUpdated={recentlyUpdated}
    />
  );
}

export async function getServerSideProps(context) {
  const hostUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const newNovelsRequestUrl = `${hostUrl}/api/novel/get-new-novels`;
  const popularNovelsRequestUrl = `${hostUrl}/api/novel/get-popular-novels`;
  const completedNovelsRequestUrl = `${hostUrl}/api/novel/get-completed-novels`;
  const recentUpdateRequestUrl = `${hostUrl}/api/chapter/get-recent`;

  let newNovels = {};
  let popularNovels = {};
  let completedNovels = {};
  let recentlyUpdated = {};

  await fetch(newNovelsRequestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (newNovels = res.data));

  await fetch(popularNovelsRequestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (popularNovels = res.data));

  await fetch(completedNovelsRequestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (completedNovels = res.data));

  await fetch(recentUpdateRequestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (recentlyUpdated = res.data));

  return {
    props: {
      newNovels: newNovels,
      popularNovels: popularNovels,
      completedNovels: completedNovels,
      recentlyUpdated: recentlyUpdated,
    },
  };
}
