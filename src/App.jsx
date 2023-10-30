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
  const initialStories = [
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

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

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

      <InputWithLabel
        id="search"
        type="text"
        onInputChange={handleSearch}
        value={searchTerm}
        isFocused
      >
        Search:{" "}
      </InputWithLabel>

      <List list={filteredStories} removeStory={handleRemoveStory} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  children,
  type,
  value,
  onInputChange,
  isFocused,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        onChange={onInputChange}
        value={value}
        placeholder={"Type here"}
      ></input>
      <p>Your search term is {value}</p>
    </>
  );
};

const List = ({ list, removeStory }) => (
  <ul>
    {list.map((item) => (
      <Item item={item} key={item.objectID} removeStory={removeStory} />
    ))}
  </ul>
);

const Item = ({ item, removeStory }) => {
  return (
    <>
      <li>
        <span>Title: {item.title}</span>
        <span>Author: {item.author}</span>
        <span>
          <a href={item.url}>URL</a>
        </span>
        <span>Comments: {item.num_comments}</span>
        <span>Points: {item.points}</span>
      </li>
      <Remove item={item} removeStory={removeStory} />
      <br /> <br />
    </>
  );
};

const Remove = ({ item, removeStory }) => {
  const removeItem = () => {
    removeStory(item);
  };

  return <button onClick={removeItem}>Remove Item</button>;
};

export default App;
