import React, { useEffect, useState } from "react";
import { catOptions } from "../options";
import { apiKey } from "../env";
import axios from "axios";

export const Home = () => {
  const [catData, setCatData] = useState(null);
  const [isFavoriteArray, setIsFavoriteArray] = useState([]);

  const fetchData = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?format=json&limit=10",
        catOptions
      )
      .then((response) => {
        setCatData(response.data);
        // Initialize isFavoriteArray with false for each image
        setIsFavoriteArray(new Array(response.data.length).fill(false));
      })
      .catch((error) => console.error("error during fetching"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  const onClickAdd = (event, catId, index) => {
    event.preventDefault();

    const catAddFavoriteOptions = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    };
    const data = {
      image_id: catId,
      sub_id: "my-user-1",
    };

    axios
      .post(
        "https://api.thecatapi.com/v1/favourites",
        data,
        catAddFavoriteOptions
      )
      .then((response) => {
        console.log(response);
        // Update only the clicked image's isFavorite state
        setIsFavoriteArray((prev) => {
          const newArray = [...prev];
          newArray[index] = true;
          return newArray;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="main-container">
      <div className="image-grid">
        {catData?.map((cat, index) => (
          <div className="image-button-pair" key={cat.id}>
            <img className="grid-image" src={cat.url} alt={`Cat ${cat.id}`} />
            <button
              className={`grid-button ${isFavoriteArray[index] ? "favorite" : ""}`}
              onClick={(event) => onClickAdd(event, cat.id, index)}
            >
              <span className="material-symbols-outlined">
                {isFavoriteArray[index] ? "heart_check" : "favorite"}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className="main-container-description">
        <h2 className="main-container-title">Cat Image Generator</h2>
        <div className="main-container-text">
          Cat Hub is where you can click on the button below to get random
          images of cats. Click on the "🤍 Favourite" button to add them to your
          favorites.
        </div>
        <button className="main-container-button" onClick={handleOnClick}>
          Randomize
        </button>
      </div>
    </section>
  );
};
