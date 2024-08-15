// Sets conditions used to sort books
export function sortBooksPipeline(
  sort = "rating",
  minReviewsCount = 20,
  ratingThreshold = 4.5,
) {
  let sortCriteria;

  switch (sort) {
    case "date":
      sortCriteria = { createdAt: -1 };
      break;
    case "author":
      sortCriteria = { "authors.0": 1 };
      break;
    case "rating":
    default:
      sortCriteria = {
        meetsHighRatingCriteria: -1,
        averageRating: -1,
        reviewsCount: -1,
        createdAt: -1,
      };
      break;
  }

  return [
    {
      $addFields: {
        meetsHighRatingCriteria: {
          $and: [
            { $gte: [{ $size: "$reviews" }, minReviewsCount] },
            {
              $gte: [
                { $round: [{ $avg: "$reviews.rating" }, 1] },
                ratingThreshold,
              ],
            },
          ],
        },
        averageRating: {
          $ifNull: [{ $round: [{ $avg: "$reviews.rating" }, 1] }, 0],
        },
        reviewsCount: { $size: "$reviews" },
      },
    },
    { $sort: sortCriteria },
  ];
}
