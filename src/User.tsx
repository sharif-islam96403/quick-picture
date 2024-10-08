import React from "react";
import "./index.css";

interface UserProps {
  name: string;
  username: string;
  bio: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  instagram_username: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  twitter_username: string;
}

const User: React.FC<UserProps> = ({ name, username, bio, profile_image, instagram_username, links, twitter_username }) => {
  
  return (
    <div className="flex items-center justify-around min-w-full mt-16">
      <div className="flex justify-between w-3/4">
        <img src={profile_image.large} className="object-contain rounded-[50%] border-black border-2 w-60 mr-5 select-none" draggable="false" alt={`Profile of ${name}`} />
        <div className="w-4/5 relative">
          <p className="text-4xl font-bold">{name}</p>
          <p className="text-gray-600 text-xl">@{username}</p>
          <p className="text-lg mt-5 mb-5">{bio}</p>
          <div className="w-1/4 h-16 flex items-center ">
            {instagram_username && (
              <a className="pr-2"
                href={`https://www.instagram.com/${instagram_username}/?hl=en`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="hover:scale-110 transition-transform duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                  </g>
                </svg>
              </a>
            )}
            {twitter_username && (
              <a className="pr-2"
                href={`https://x.com/${twitter_username}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="32px"
                  y="32px"
                  width="32"
                  height="32"
                  className="hover:scale-110 transition-transform duration-500"
                  viewBox="0 0 30 30"
                >
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                </svg>
              </a>
            )}
            <a className="pr-2"
            href={links.html} target="_blank" rel="noreferrer">
              <svg
                fill="#000000"
                width="32px"
                height="32px"
                className="hover:scale-110 transition-transform duration-500"
                viewBox="0 0 32.00 32.00"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                strokeWidth="0.00032"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="2.048"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M10 9v-9h12v9zM22 14h10v18h-32v-18h10v9h12z"></path>{" "}
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
