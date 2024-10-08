import React, { useEffect, useState } from "react";
import Form from "./Form";
import ImageCanvas from "./Images";
import User from "./User";
import "./index.css";

type UserType = {
  name: string;
  username: string;
  bio: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  instagram_username: string;
  twitter_username: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
} | null;

type PhotoResult = {
  urls: {
    raw: string;
    regular: string;
  };
  location?: {
    name?: string;
    city?: string;
    country?: string;
    position?: {
      latitude: number;
      longitude: number;
    };
  };
  user: UserType;
  links: {
    download: string;
  };
};

type UnsplashResponse = {
      results: PhotoResult[];
      user: UserType;
      links: {
        download: string;
      };
      errors?: string;
    } | PhotoResult[];

type Response = {
  url: { raw: string; regular: string };
  download: string;
  user: UserType;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<Response[]>([]);
  const [queryType, setQueryType] = useState<string>("");
  const [user, setUser] = useState<UserType>(null);
  const [pages, setPages] = useState<number>(2);
  const [previousPrompt, setPreviousPrompt] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setPrompt("");
    setUser(null);
    setMessage(null);
    setImages([]);
  }, [queryType]);

  useEffect(() => {
    setMessage(null);
  }, [prompt]);

  const selectUrl = (currentPrompt : string) => {
    const API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
    const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    switch (queryType) {
      case "random":
        return API_URL + "/photos/random" + "?count=10&client_id=" + ACCESS_KEY;
      case "user":
        return (
          API_URL + "/users/" + currentPrompt + "/photos" + "?client_id=" + ACCESS_KEY
        );
      default:
        return (
          API_URL + "/search/photos?query=" + currentPrompt + "&client_id=" + ACCESS_KEY
        );
    }
  };

  const fetchUser = (response: UnsplashResponse) => {
    try {
      console.log("User:", response);
      if (Array.isArray(response) && response.length > 0) {
        setUser(response[0].user);
        return;
      }
      if (!Array.isArray(response) && response.user) {
        setUser(response.user);
        return;
      }
      setUser(null);
    } catch (error) {
      setUser(null);
      console.error("Error in fetchUser:", error);
      setError(
        `An unexpected error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const formatResult = (response: UnsplashResponse) => {
    if (Array.isArray(response)) {
      return response.map((item) => ({
        url: { raw: item.urls.raw, regular: item.urls.regular },
        download: item.links.download,
        user: item.user,
      }));
    } else if (response.results) {
      return response.results.map((item) => ({
        url: { raw: item.urls.raw, regular: item.urls.regular },
        download: item.links.download,
        user: item.user,
      }));
    } else if(response.errors){
      throw new Error(response.errors);
    } 
    else {
      throw new Error("Unexpected response format");
    }
  };

  const handleFetchImages = async () => {
    setMessage(null);
    if (previousPrompt !== prompt) {
      setImages([]);
      setPreviousPrompt(prompt);
    }
    setPages(2);
    setUser(null);
    setError(null);
    setLoading(true);
    try {
      const requestUrl = selectUrl(prompt);

      const response = await fetch(requestUrl).then((res) => res.json());
      console.log("Response:", response);

      const result = formatResult(response) as Response[];
      console.log("Result:", result);

      if(result.length === 0) {
        setMessage("No images found");
      }

      const preloadedImages = await preloadImages(result);
      setImages(preloadedImages);

      if(queryType === "user") {
        if(response.length === 0) {
          setMessage("No images found for this user");
        }
        else {
          fetchUser(response);
        }
      }
    } catch (error) {
      console.error("Error in handleFetchImages:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
    setLoading(false);
  };

  const getMoreImages = async () => {
    setPrompt(previousPrompt);
    setLoading(true);
    try {
      const requestUrl = selectUrl(previousPrompt) + "&page=" + pages;
      setPages(pages + 1);

      const response = await fetch(requestUrl).then((res) => res.json());
      console.log("Response:", response);

      const result = formatResult(response) as Response[];
      console.log("Result:", result);

      if (result.length === 0) {
        setMessage("No more images found");
      }

      const preloadedImages = await preloadImages(result);
      setImages([...images, ...preloadedImages]);
    } catch (error) {
      console.error("Error in getMoreImages:", error);
      setError(
        `An unexpected error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
    setLoading(false);
  };

  const preloadImages = ( imageArray: Response[]) => {
    return new Promise<Response[]>((resolve, reject) => { 
      const loadedImages: Response[] = [];
      let loadedCount = 0;

      if (loadedCount === imageArray.length) {
        console.log("All images preloaded");
        resolve(loadedImages);
      }

      imageArray.forEach((imageData, index) => {
        const img = new Image();
        img.src = imageData.url.regular;

        img.onload = () => {
          loadedImages[index] = imageData;
          loadedCount++;

          if (loadedCount === imageArray.length) {
            console.log("All images preloaded");
            resolve(loadedImages);
          }
        };

        img.onerror = (err) => {
          reject(`Image failed to load: ${err}`);
        };
      });
    });
  };

  const handleClick = () => {
    if (prompt.trim() === "" && queryType !== "random") {
      if (queryType === "user") {
        setError("Error! Username cannot be empty!");
      } else {
        setError("Error! Prompt cannot be empty!");
      }
    } else if (prompt.length > 100 && queryType !== "random") {
      setError("Prompt input cannot exceed 100 characters.");
    } else {
      handleFetchImages();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    setPrompt(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mt-10 mb-10 font-ubuntu">
        Quick Picture
      </h1>
      <Form
        prompt={prompt}
        onInputChange={handleInputChange}
        loading={loading}
        handleClick={handleClick}
        error={error}
        queryType={queryType}
        setQueryType={setQueryType}
      />

      {user !== null && queryType === "user" && (
        <User
          name={user.name}
          username={user.username}
          bio={user.bio}
          profile_image={user.profile_image}
          instagram_username={user.instagram_username}
          links={user.links}
          twitter_username={user.twitter_username}
        />
      )}

      <ImageCanvas images={images} />

      {message && (
        <div className="text-white text-2xl font-bold mb-10">{message}</div>
      )}

      {images.length > 0 && (
        <button
          tabIndex={0}
          onClick={getMoreImages}
          disabled={loading}
          className="w-28 select-none border-solid border-2 border-[#133C55] rounded-2xl text-white font-bold h-12 bg-[#386FA4] active:bg-[#2b5680] disabled:opacity-50 mb-20"
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-1">
              <span className="sr-only">Loading...</span>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
            </div>
          ) : (
            "More"
          )}
        </button>
      )}
    </div>
  );
};

export default App;