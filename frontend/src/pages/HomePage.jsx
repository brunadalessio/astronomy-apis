import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import '../styles/HomePage.css';

const ITEMS_PER_PAGE = 15;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [picData, setPicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/apod?page=${page}`);
      console.log(response.data);

      const totalItems = (page - 1) * ITEMS_PER_PAGE + response.data.length;
      if (totalItems >= response.data.total) {
        setInitialLoad(false);
      }

      if (initialLoad) {
        setPicData(response.data);
      } else {
        setPicData((prevData) => [...prevData, ...response.data]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [page, initialLoad]);

  const scrollToEnd = () => {
    if (!loading && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollToEnd);

    return () => {
      window.removeEventListener('scroll', scrollToEnd);
    };
  }, [loading]);

  return (
    <div>
      <Navbar />
      <div className="grid-container">
        {picData.slice(0, page * ITEMS_PER_PAGE).map((entry, index) => (
          <div key={index} className="grid-item">
            <h2>{entry.title}</h2>
            <p>Date: {entry.date}</p>
            <p>{entry.explanation}</p>
            <img src={entry.url} alt={entry.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
