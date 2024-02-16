import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [bookClubs, setBookClubs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookclubs").then((response) => {
      setBookClubs(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="book" content="Reading Room"></Header>
      <ul>
        {bookClubs.map((bookclub: any) => (
          <List.Item key={bookclub.id}>{bookclub.name}</List.Item>
        ))}
      </ul>
    </div>
  );
}

export default App;
