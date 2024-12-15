import { useEffect, useState } from "react";

type DisplayMode = "phone" | "desktop";

const PHONE_BREAKPOINT = 768; // You can adjust this value as needed

export default function useDisplayMode(): DisplayMode {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("desktop");

  useEffect(() => {
    function handleResize() {
      setDisplayMode(
        window.innerWidth <= PHONE_BREAKPOINT ? "phone" : "desktop",
      );
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return displayMode;
}
