import React, { useEffect, useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://testapi.devtoolsdaily.com/users?pageNumber=${pageNumber}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setItems(data);
        setPageNumber((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.error('error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        // If not, return early and do nothing
        return;
      } else {
        // If scrolled to the bottom, trigger fetchData function to fetch more data
        fetchData();
      }
    };
    // This means that whenever the user scrolls the window, the handleScroll function will be executed.
    window.addEventListener('scroll', handleScroll);

    // This is the cleanup function. It is returned from the useEffect hook and will be executed when the component unmounts or when the dependencies specified in the dependency array change
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  return (
    <div>
      <h1> Infinite scroll</h1>
      {items.map((item, index) => (
        <div key={index}>{item.firstName}</div>
      ))}

      {loading && <p>Loading..</p>}
    </div>
  );
};

export default App;
