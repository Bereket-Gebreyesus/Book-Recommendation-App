import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

const FavoriteButton = ({ userId, bookId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const onSuccess = () => {
    return true;
  };

  const { isLoading, performFetch, cancelFetch } = useFetch(
    `/user/id/${userId}`,
    onSuccess,
  );

  const { performFetch: performAddFavoriteFetch } = useFetch(
    "/user/favorites",
    onSuccess,
  );
  const { performFetch: performRemoveFavoriteFetch } = useFetch(
    "/user/favorites",
    onSuccess,
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  const handleAddFavorite = (e) => {
    e.preventDefault();

    performAddFavoriteFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, bookId }),
    });
    setIsFavorite((prev) => !prev);
  };

  const handleRemoveFavorite = (e) => {
    e.preventDefault();

    performRemoveFavoriteFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, bookId }),
    });

    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      disabled={isLoading}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};

FavoriteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default FavoriteButton;
