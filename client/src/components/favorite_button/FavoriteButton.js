import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";

const FavoriteButton = ({ userId, bookId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { isLoading, performFetch, cancelFetch } = useFetch(
    `/user/id/${userId}`,
    (res) => {
      if (res.user.favorites.includes(bookId)) setIsFavorite(true);
    },
  );

  const { performFetch: performAddFavFetch } = useFetch("/user/favorites");
  const { performFetch: performRemoveFavFetch } = useFetch("/user/favorites");

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  const handleAddFavorite = (e) => {
    e.preventDefault();
    performAddFavFetch({
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
    performRemoveFavFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, bookId }),
    });
    setIsFavorite((prev) => !prev);
  };

  return (
    <Button
      variant={isFavorite ? "danger" : "primary"}
      className="mt-3"
      onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      disabled={isLoading}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
};

FavoriteButton.propTypes = {
  userId: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default FavoriteButton;
