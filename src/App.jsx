/* eslint-disable react/prop-types */
import * as React from "react";

/*Custom hook*/

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: "WordPress",
      url: "https://redux.js.org/",
      author: "Community",
      num_comments: 12,
      points: 7,
      objectID: 2,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <List list={filteredStories} />
    </div>
  );
};

const Search = ({ onSearch, searchTerm }) => {
  return (
    <form>
      <label htmlFor="input">Search for courses:</label>
      <input
        id="search"
        onChange={onSearch}
        value={searchTerm}
        placeholder={"Type here"}
      ></input>
      <p>Your search term is {searchTerm}</p>
    </form>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item item={item} key={item.objectID} />
    ))}
  </ul>
);

const Item = ({ item }) => {
  return (
    <li>
      <span>Title: {item.title}</span>
      <span>Author: {item.author}</span>
      <span>
        <a href={item.url}>URL</a>
      </span>
      <span>Comments: {item.num_comments}</span>
      <span>Points: {item.points}</span>
      <br /> <br />
    </li>
  );
};

export default App;
