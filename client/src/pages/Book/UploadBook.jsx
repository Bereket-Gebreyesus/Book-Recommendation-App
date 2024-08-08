import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "../../components/Book/BookForm";
import { checkBookUniqueness } from "../../util/checkBookUniqueness";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const UploadBookPage = () => {
  const { userEmail } = useAuth();
  const email = userEmail;
  const [bookData, setBookData] = useState({
    title: "",
    authors: [],
    description: "",
    isbn: "",
    publishedDate: "",
    publisher: "",
    tags: [],
    uploadedBy: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagsOptions, setTagsOptions] = useState([]);

  const navigate = useNavigate();

  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_SERVER_URL}/api/user/id`,
        { params: { email } },
      );
      setBookData((prevState) => ({
        ...prevState,
        uploadedBy: response.data.userId,
      }));
    } catch (error) {
      setError("Error fetching user ID");
    }
  };

  useEffect(() => {
    fetchUserIdByEmail(email);
  }, [email]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_SERVER_URL}/api/tags`,
        );
        setTagsOptions(response.data.result);
      } catch (err) {
        setError(err.message || "An error occurred while fetching tags");
      }
    };

    fetchTags();
  }, []);

  const handleChange = (fieldName, value) => {
    let updatedValue = value;
    if (fieldName === "authors") {
      updatedValue = value.split(",").map((author) => author.trim());
    }
    setBookData((prevState) => ({
      ...prevState,
      [fieldName]: updatedValue,
    }));
  };

  const handleTagClick = (tagId) => {
    setBookData((prevState) => {
      const isTagSelected = prevState.tags.includes(tagId);
      const newTags = isTagSelected
        ? prevState.tags.filter((id) => id !== tagId)
        : [...prevState.tags, tagId];
      return {
        ...prevState,
        tags: newTags,
      };
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const uniquenessResult = await checkBookUniqueness(bookData, setError);
    if (!uniquenessResult.unique) {
      if (uniquenessResult.message) {
        alert(uniquenessResult.message);
      }
      return;
    }
    const formData = new FormData();
    for (const key in bookData) {
      if (key === "tags" || key === "authors") {
        bookData[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, bookData[key]);
      }
    }
    if (file) {
      formData.append("image", file);
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/books/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        alert("Book uploaded successfully!");

        setBookData({
          title: "",
          authors: "",
          description: "",
          isbn: "",
          publishedDate: "",
          publisher: "",
          tags: [],
          uploadedBy: "",
        });
        setFile(null);

        navigate("/");
      } else {
        setError(response.data.msg || "An error occurred");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Uploading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <BookForm
        bookData={bookData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={(e) => handleSubmit(e)}
        tagsOptions={tagsOptions}
        handleTagClick={handleTagClick}
      />
    </div>
  );
};

export default UploadBookPage;
