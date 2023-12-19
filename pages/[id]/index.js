import { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "../../lib/dbConnect";
import Doc from "../../models/Pet";

const DocViewPage = () => {
  const router = useRouter();
  console.log(router.route);

  return <div>THIS IS THE DOC VIEW</div>;
};

export default DocViewPage;

export async function getServerSideProps(context) {
  console.log(context, context.query);
  // const { patchId } = context.query;

  // try {
  //   let patch = {};

  //   const { req } = context;
  //   const baseUrl = req.headers.host;
  //   const protocol = req.headers["x-forwarded-proto"] || "http";
  //   const apiUrl = `${protocol}://${baseUrl}/api/patches/${patchId}`;

  //   const fetchedData = await getOneMethod(apiUrl);

  //   if (fetchedData) {
  //     patch = fetchedData;
  //   }

  //   return {
  //     props: {
  //       patch,
  //     },
  //   };
  // } catch (error) {
  //   console.log(error);
  // }
  return {
    props: {
      name: "STEFANOS",
    },
  };
}
