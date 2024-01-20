export const getTitle = (dataItem) => {
  const title = dataItem.content.blocks.find(
    (block) => block.type === "header-one"
  ).text;
  return title || "";
};
