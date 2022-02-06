import { useEffect, useState } from 'react';

function App() {

  const [articles, setArticles] = useState([]);

  

  useEffect(()=> {
    async function fetchData() {
      await fetch('http://localhost:8000/articles')
      .then(response => response.json())
      .then(data => {
        console.log({ data});
        setArticles(data);
      })
    }
    fetchData();
  }, [])
  console.log('Array', {articles});

  const content = articles.map((article) => {
    return (
      <ol>
        <li>{article.title}</li>
        <li>{article.url}</li>
      </ol>

    );
  })
  return (
    <div>
      <p> Hello </p>
      {content}
    </div>
  );
}

export default App;
