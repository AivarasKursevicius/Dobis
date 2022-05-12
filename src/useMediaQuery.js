import { useState, useEffect } from "react";

const useMediaQuery = (minWidth) => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    isDesiredWidth: false,
  });
  console.log("start : ", state);
  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      console.log("currentWindowWidth : ", currentWindowWidth);
      console.log("isDesiredWidth : ", isDesiredWidth);
      console.log("resizeHandler : ", state);
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [state.windowWidth, state, minWidth]);

  return state.isDesiredWidth;
};

export default useMediaQuery;
