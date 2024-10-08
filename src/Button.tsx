import React, { useEffect, useState } from "react";
import "./index.css";

type Props = {
  onClick: () => void;
  loading: boolean;
  queryType: string;
  setQueryType: (queryType: string) => void;
};

const Button: React.FC<Props> = ({ onClick, loading, queryType, setQueryType }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = ( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) => {
    if (loading) return;
    event.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  const queryName = () => {
    switch (queryType) {
      case "random":
        return "Random Images";
      case "user":
        return "Search Users";
      default:
        return "Search";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !(event.target as Element).closest(".relative.inline-block")
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[]);

  const buttonName: string = queryName();

  return (
    <div className="relative inline-block">
      <div className="h-10 m-w-200 items-center flex justify-center rounded-2xl select-none min-w-200 text-white font-bold hover:shadow-md hover:shadow-[#3b7ab8] transition-shadow duration-500 cursor-pointer">
        <button
          className="h-10 w-10/12 bg-[#386FA4] rounded-l-2xl active:bg-[#2b5680] disabled:opacity-50 border-l-2 border-solid border-y-2 border-[#133C55]"
          type="button"
          disabled={loading}
          onClick={onClick}
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-1">
              <span className="sr-only">Loading...</span>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
            </div>
          ) : (
            buttonName
          )}
        </button>
        <span
          className={`${
            loading && "opacity-50"
          } flex h-10 items-center justify-center rounded-r-2xl active:bg-[#2b5680] right-0 bg-[#386FA4] w-2/12 border-r-2 border-y-2 border-solid border-[#133C55]`}
          onClick={toggleDropdown}
          role="button"
          aria-pressed={isDropdownOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              toggleDropdown(
                event as unknown as React.MouseEvent<
                  HTMLSpanElement,
                  MouseEvent
                >
              );
            }
          }}
          tabIndex={0}
        >
          ▼
        </span>
      </div>

      {isDropdownOpen && (
        <div className="border-2 border-[#386FA4] rounded-2xl absolute z-[1] bg-[#91E5F6] -right-16 text-[#386FA4] select-none font-bold mt-2">
          <div
            className="p-3 cursor-pointer hover:bg-[#386FA4] hover:text-white rounded-t-xl"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("");
                console.log("Search for images initiated");
            }}
          >
            Search
          </div>
          <div
            className="p-3 cursor-pointer hover:bg-[#386FA4] hover:text-white"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("random");
                console.log("Search for random images initiated");
            }}
          >
            Random Images
          </div>
          <div
            className="p-3 cursor-pointer hover:bg-[#386FA4] hover:text-white rounded-b-xl"
            onClick={() => {
              setDropdownOpen(false);
              setQueryType("user");
                console.log("Search for users initiated");
            }}
          >
            Search Users
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
