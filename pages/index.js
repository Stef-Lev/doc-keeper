import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import { Box, Text } from "@chakra-ui/react";

const Index = ({ docs }) => {
  console.log(docs);
  return (
    <Box>
      <Text as="p">STEFANOS</Text>
      {docs.map((item, idx) => (
        <Box key={idx + 1}>{item}</Box>
      ))}
    </Box>
  );
};

/* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {
//   await dbConnect();

//   /* find all the data in our database */
//   const result = await Pet.find({});
//   const pets = result.map((doc) => {
//     const pet = doc.toObject();
//     pet._id = pet._id.toString();
//     return pet;
//   });

//   return { props: { docs: pets } };
// }

export async function getServerSideProps() {
  await dbConnect();
  const data = await import("../database.json");
  const json = JSON.parse(JSON.stringify(data));
  const docs = json.documents.map(
    (item) =>
      item.content.blocks.filter((item) => item.type === "header-one")[0].text
  );
  console.log(docs);

  return { props: { docs } };
}

export default Index;
