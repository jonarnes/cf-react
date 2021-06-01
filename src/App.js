import './App.css';
//https://www.contentful.com/developers/docs/javascript/tutorials/getting-started-with-react-and-contentful/

import { useState, useEffect } from "react";
import { ImageEngineProvider, Image } from "@imageengine/react"

function App() {

  // define the initial state
  const [page, setPage] = useState(null);

  useEffect(() => {
    const query = `
    {
      pageCollection {
        items {
          title
          logo {
            url
          }
        }
      }
    }
    `
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/1j6watd6ddbk/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          "Authorization": "Bearer " + process.env.REACT_APP_KEY,
          //"Authorization": "Bearer qSBFvCtGtxyBY5wAsdFgfooXL78rgiBqp5dxrFzvi8Q",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.pageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <header className="App-header">
      <ImageEngineProvider deliveryAddress="https://z5s452n5.cdn.imgeng.in" stripFromSrc="https://images.ctfassets.net">
        <Image src={page.logo.url} className="App-logo" alt="logo"></Image>
      </ImageEngineProvider>
      <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;
