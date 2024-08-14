// Sets conditions used to sort books
export function sortBooksPipeline(minReviewsCount = 20, ratingThreshold = 4.5) {
  return [
    {
      $addFields: {
        // Books that meet meetsHighRatingCriteria are sorted first, then sorted by rating and number of reviews
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

        // Calculate the average rating of each book
        averageRating: {
          $ifNull: [{ $round: [{ $avg: "$reviews.rating" }, 1] }, 0],
        },

        // Count the number of reviews
        reviewsCount: { $size: "$reviews" },
      },
    },
    {
      $sort: {
        // Sorting condition №0: Meets rating threshold
        meetsHighRatingCriteria: -1,
        // Sorting condition №1: Enough number of reviews
        hasEnoughRatings: -1,
        // Sorting condition №2: Average rating of each book
        averageRating: -1,
        // Sorting condition №3: Number of reviews
        reviewsCount: -1,
        // Sorting condition №4: Uploading date
        createdAt: -1,
      },
    },
  ];
}
