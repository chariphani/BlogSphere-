import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
export default function useBlogs(params = {}) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = params.search || "";
  const category = params.category || "";
  useEffect(() => {
    let active = true;
    setLoading(true);
    getBlogs({ search, category })
      .then((data) => {
        if (active) setBlogs(data.blogs);
      })
      .catch((err) => {
        if (active)
          setError(err.response?.data?.message || "Could not load blogs");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [search, category]);
  return { blogs, setBlogs, loading, error };
}
