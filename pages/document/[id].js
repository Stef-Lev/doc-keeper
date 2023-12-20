import { useState } from "react";
import { useRouter } from "next/router";
// import dbConnect from "../../lib/dbConnect";
// import Doc from "../../models/Doc";

const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.route, id);

  return <div>THIS IS THE DOC VIEW</div>;
};

export default DocViewPage;

// export async function getServerSideProps(context) {
//   await dbConnect();
//   console.log(context.query);
//   const { id } = context.query;

//   // try {
//   //   let patch = {};

//   //   const { req } = context;
//   //   const baseUrl = req.headers.host;
//   //   const protocol = req.headers["x-forwarded-proto"] || "http";
//   //   const apiUrl = `${protocol}://${baseUrl}/api/patches/${patchId}`;

//   //   const fetchedData = await getOneMethod(apiUrl);

//   //   if (fetchedData) {
//   //     patch = fetchedData;
//   //   }

//   //   return {
//   //     props: {
//   //       patch,
//   //     },
//   //   };
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   return {
//     props: {
//       name: "STEFANOS",
//     },
//   };
// }
