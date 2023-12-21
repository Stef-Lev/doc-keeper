import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDoc } from "@/helpers/apiServices";
import Loader from "@/components/Loader";

const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.route, id);
  const { isPending, error, data, fetching } = useQuery({
    queryKey: ["docView"],
    queryFn: () => getDoc("/api/docs/", id).then((res) => res.data),
    enabled: !!id,
  });

  if (isPending) {
    return <Loader fullScreen />;
  }
  console.log({ data });
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
