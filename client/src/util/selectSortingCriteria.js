export const selectSortingCriteria = (
  eventKey,
  sortCriteria,
  setSortCriteria,
  setBooks,
  setDropdownTitle,
) => {
  // If the selected sort criteria is the same as the current one, do nothing
  if (eventKey === sortCriteria) return;

  setSortCriteria(eventKey);
  setBooks([]);

  // Update the dropdown title
  setDropdownTitle(eventKey.charAt(0).toUpperCase() + eventKey.slice(1));
};
