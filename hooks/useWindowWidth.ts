import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useWindowWidth;
