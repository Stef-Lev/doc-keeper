import React from "react";
import { useRouter } from "next/router";

function ShowDocPage() {
  const router = useRouter();
  const { id } = router.query;

  return <div>DOC IS {`${id}`}</div>;
}

export default ShowDocPage;
