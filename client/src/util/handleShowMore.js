// Function to handle the "Show more..." button click
const handleShowMore = (currentPage, totalPages, setCurrentPage) => {
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

export default handleShowMore;
