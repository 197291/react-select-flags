export const getOptionBySelectIndex = (options, selectedIndex, itemsName) => {
  let items = [];
  options.forEach((category) => {
    items = items.concat(category[itemsName]);
  });
  return items[selectedIndex];
};

export const getCountVisibleTitles = (options, selected, itemsName) => {
  let count = 1;
  let lastLen = 0;
  options.forEach((category, i) => {
    lastLen += category[itemsName].length;
    if (selected >= lastLen) {
      count += 1;
    }
  });
  return count;
};
