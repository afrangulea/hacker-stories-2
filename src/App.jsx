/* eslint-disable react/prop-types */
import * as React from "react";

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

  const [searchTerm, setSearchTerm] = React.useState("");

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

const Search = (props) => {
  const { onSearch, searchTerm } = props;
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

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item item={item} key={item.objectID} />
    ))}
  </ul>
);

const Item = (props) => {
  return (
    <li>
      <span>Title: {props.item.title}</span>
      <span>
        <a href={props.item.url}>URL</a>
      </span>
      <span>Comments: {props.item.num_comments}</span>
      <span>Points: {props.item.points}</span>
      <br /> <br />
    </li>
  );
};

export default App;
