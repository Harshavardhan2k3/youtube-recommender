import React from "react";
import { DiReact } from "react-icons/di";
import { CgFormatSlash } from "react-icons/cg";
import { IconContext } from "react-icons";
import { FaYoutube } from "react-icons/fa";

function Navbar() {
  return (
    <div className="absolute flex flex-row top-0 left-0 w-screen h-16 backdrop-blur bg-black/50">
      <IconContext.Provider
        value={{ color: "white", size: "54px", className: "stroke-[0px]" }}
      >
        <div className="flex flex-row">
          <DiReact />

        </div>
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: "white", size: "48px", className: "stroke-[0px]" }}
      >
        <div className="flex flex-row">
          <CgFormatSlash />

        </div>
      </IconContext.Provider>
      <IconContext.Provider
        value={{ color: "white", size: "48px", className: "stroke-[0px]" }}
      >
        <div className="flex flex-row">
          <FaYoutube />

        </div>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
