export const getTitle = (dataItem) => {
  //   console.log(dataItem.content.blocks);
  const title = dataItem.content.blocks.find(
    (block) => block.type === "header-one"
  ).text;
  return title || "";
};
