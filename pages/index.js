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

  const fetchHomePageData = async (requestUrl) => {
    const res = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return res.data;
  };

  const newNovels = await fetchHomePageData(newNovelsRequestUrl);
  const popularNovels = await fetchHomePageData(popularNovelsRequestUrl);
  const completedNovels = await fetchHomePageData(completedNovelsRequestUrl);
  const recentlyUpdated = await fetchHomePageData(recentUpdateRequestUrl);

  return {
    props: {
      newNovels: newNovels,
      popularNovels: popularNovels,
      completedNovels: completedNovels,
      recentlyUpdated: recentlyUpdated,
    },
  };
}
