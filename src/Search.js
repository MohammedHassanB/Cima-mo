import { useRef } from "react";
import { useKey } from "./useKey";
export default function Search({ query, setQuery }) {
  const searchEl = useRef(null);
  useKey("enter", function () {
    if (document.activeElement === searchEl.current) return;
    searchEl.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchEl}
    />
  );
}
