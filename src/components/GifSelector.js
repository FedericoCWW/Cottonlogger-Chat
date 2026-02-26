import { useState, useEffect } from "react";
import GifBoxIcon from "@mui/icons-material/GifBox";
import "../features/Chat.scss";

const api_key = "gmpbpMwvSUc7vghrqWih8vlSe6oVPbMn";


function GifSelector({ onSelect }) {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) fetchGifs("trending");
  }, [show]);

  const fetchGifs = async (term) => {
    setLoading(true);
    try {
      const endpoint =
        term === "trending"
          ? `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=20`
          : `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=${api_key}&limit=20`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setGifs(data.data || []);
    } catch (err) {
      console.error("Error fetching GIFs:", err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim()) {
      fetchGifs(val);
    } else {
      fetchGifs("trending");
    }
  };
  return (
    <div>
      <GifBoxIcon
        fontSize="large"
        onClick={() => setShow(!show)}
        style={{ cursor: "pointer" }}
      />
      {show && (
        <div className="gif__picker">
          <input
            className="gif__search"
            type="text"
            placeholder="Search GIFs..."
            value={search}
            onChange={handleSearch}
            autoFocus
          />
          <div className="gif__grid">
            {loading && <p className="gif__loading">Loading...</p>}
            {!loading &&
              gifs.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="gif__item"
                  onClick={() => {
                    onSelect(gif.images.original.url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GifSelector;
