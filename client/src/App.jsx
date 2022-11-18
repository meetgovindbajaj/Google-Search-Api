import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const [search, setSearch] = useState({ q: "" });
  const [results, setresults] = useState([]);
  const [searchresults, setsearchresults] = useState({
    search: "",
    result: [],
  });
  const [imageresults, imagesetresults] = useState({
    search: "",
    result: [],
  });
  const [newsresults, newssetresults] = useState({
    search: "",
    result: [],
  });
  const [loading, setloding] = useState(false);
  const [quote, setquote] = useState("Search");
  const [n, setnew] = useState(true);
  const Section1 = () => {
    setresults([]);
    setnew(true);
    if (search.q !== "") {
      const r = () => handleSubmit();
      r();
    }
    return <></>;
  };
  useEffect(() => {
    Section1();
  }, [quote]);
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setnew(false);
    if (quote === "Search") {
      if (searchresults.search !== search) {
        setloding(true);
        const res = await fetch(
          `https://google-search3.p.rapidapi.com/api/v1/search/${new URLSearchParams(
            search
          ).toString()}&num=1000`,
          {
            method: "GET",
            headers: {
              "x-user-agent": "desktop",
              "x-proxy-location": "EU",
              "x-rapidapi-host": "google-search3.p.rapidapi.com",
              "x-rapidapi-key":
                "4be2e5dcfdmsheefc1866508141cp17ef65jsndfde081e24e2",
            },
          }
        );
        const data = await res.json();
        if (data.results) {
          setresults(data.results);
          setsearchresults({
            search: search,
            result: data.results,
          });
        }
      } else {
        setresults(searchresults.result);
      }
    } else if (quote === "Image") {
      if (imageresults.search !== search) {
        setloding(true);
        const res = await fetch(
          `https://google-search3.p.rapidapi.com/api/v1/images/${new URLSearchParams(
            search
          ).toString()}&num=1000`,
          {
            method: "GET",
            headers: {
              "x-user-agent": "desktop",
              "x-proxy-location": "EU",
              "x-rapidapi-host": "google-search3.p.rapidapi.com",
              "x-rapidapi-key":
                "4be2e5dcfdmsheefc1866508141cp17ef65jsndfde081e24e2",
            },
          }
        );
        const data = await res.json();
        if (data.image_results) {
          setresults(data.image_results);
          imagesetresults({
            search: search,
            result: data.image_results,
          });
        }
      } else {
        setresults(imageresults.result);
      }
    } else if (quote === "News") {
      if (newsresults.search !== search) {
        setloding(true);
        const res = await fetch(
          `https://google-search3.p.rapidapi.com/api/v1/news/${new URLSearchParams(
            search
          ).toString()}&num=1000`,
          {
            method: "GET",
            headers: {
              "x-user-agent": "desktop",
              "x-proxy-location": "EU",
              "x-rapidapi-host": "google-search3.p.rapidapi.com",
              "x-rapidapi-key":
                "4be2e5dcfdmsheefc1866508141cp17ef65jsndfde081e24e2",
            },
          }
        );
        const data = await res.json();
        if (data.entries) {
          setresults(data.entries);
          newssetresults({
            search: search,
            result: data.entries,
          });
        }
      } else {
        setresults(newsresults.result);
      }
    }
    setloding(false);
  };
  const Output = () => {
    if (quote === "Search") {
      return results.map((i) => {
        return (
          <>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            <a href={i.link} target="_blank" rel="noopener noreferrer">
              {i.link}
            </a>
          </>
        );
      });
    } else if (quote === "Image") {
      return results.map((i) => {
        return (
          <div className="img-con">
            <div>
              <img src={i.image.src} alt="" className="App-logo" />
            </div>
            <a
              href={i.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="App-link"
            >
              {i.link.title}
            </a>
          </div>
        );
      });
    } else if (quote === "News") {
      return results.map((i) => {
        return (
          <>
            <h3>{i.title}</h3>
            <a href={i.link} target="_blank" rel="noopener noreferrer">
              {i.link}
            </a>
          </>
        );
      });
    }
  };
  const Result = () => {
    return loading ? (
      <>Searching...</>
    ) : results.length !== 0 ? (
      <Output />
    ) : n ? (
      <></>
    ) : (
      <>no search results</>
    );
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          setquote("Search");
          if (quote !== "Search") {
            if (
              searchresults.result.length !== 0 &&
              searchresults.search === search
            ) {
              setresults(searchresults.result);
            } else {
              setresults([]);
            }
          }
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          setquote("Image");
          if (quote !== "Image") {
            if (
              imageresults.result.length !== 0 &&
              imageresults.search === search
            ) {
              setresults(imageresults.result);
            } else {
              setresults([]);
            }
          }
        }}
      >
        Image Search
      </button>
      <button
        onClick={() => {
          setquote("News");
          if (quote !== "News") {
            if (
              newsresults.result.length !== 0 &&
              newsresults.search === search
            ) {
              setresults(newsresults.result);
            } else {
              setresults([]);
            }
          }
        }}
      >
        News Search
      </button>
      <section>
        <p>
          Google {quote} {quote === "Search" ? "" : "Search"}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            id="q"
            name="q"
            onChange={(e) => setSearch({ q: e.target.value })}
          />

          <input type="submit" value="Search" />
        </form>
        <Result />
      </section>
    </div>
  );
}

export default App;
