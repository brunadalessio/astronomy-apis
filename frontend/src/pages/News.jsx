import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import '../styles/News.css';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/news');
        console.log(response.data);
        setArticles(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    }, []);

    return (
      <>
        <Navbar />
        <div className="container">
        <ul className="articles-list">
            {articles.map(article => (
            <div key={article.id} className="article">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-date">Published in: {new Date(article.published_at).toLocaleDateString()}</p>
                <img src={article.image_url} alt={article.title} className="article-image" />
                <p className="article-summary">{article.summary}</p>
                <a href={article.url} className="article-link" target="_blank" rel="noopener noreferrer">Leia mais</a>
            </div>
            ))}
        </ul>
        </div>
      </>
    );
}
export default News;
