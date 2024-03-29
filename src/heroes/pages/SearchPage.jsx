import { useLocation, useNavigate } from "react-router-dom";
import { HeroCard } from "../components";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";
import { useState } from "react";

export const SearchPage = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeroFound, setIsHeroFound] = useState(false);

  // Variables
  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);
  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  // Functions
  const toogleMessage = () => {
    setIsHeroFound(!isHeroFound);
  };

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (searchText.trim().length <= 1) return;
    navigate(`?q=${searchText}`);
    toogleMessage();
  };

  return (
    <div>
      <h1 className="mt-5">SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-dark mt-2">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            className="alert alert-info animate__animated animated_fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>

          <div
            className="alert alert-danger animate__animated animated_fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            There is no hero with <b>{q}</b>
          </div>

          {/* {q === "" ? (
            <div className="alert alert-info">Search a hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                There is no hero with <b>{q}</b>
              </div>
            )
          )} */}

          {/* {isHeroFound && <div className="alert alert-dark">Heroes</div>}
          {!isHeroFound && (
            <div className="alert alert-danger">
              No hero with <b>{q}</b>
            </div>
          )} */}
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
