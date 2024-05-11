import React, { useEffect } from "react";
import Home from "./Home";
import HomeLayout from "../../pages/HomeLayout";
import Features1 from "./Features1";
import Features2 from "./Features2";
import Features3 from "./Features3";
import ShareableForms from "./ShareableForms";
import GetStart from "./GetStart";

const Welcome = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <HomeLayout>
        <Home />
        <Features1 />
        <Features2 />
        <Features3 />
        <ShareableForms />
        <GetStart />
      </HomeLayout>
    </div>
  );
};

export default Welcome;
