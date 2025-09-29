import { useState, useEffect } from 'react';
import axios from 'axios';

const ContentFetcher = ({ contentType, limit = 10, children }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_STRAPI_API_URL}/${contentType}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
            params: {
              pagination: { limit },
              sort: ['createdAt:desc'],
              populate: '*',
            },
          }
        );
        setContent(response.data.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${contentType}:`, err);
        setError(`Failed to load ${contentType}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, limit]);

  return children({ content, loading, error });
};

export default ContentFetcher;

// Usage Example:
// <ContentFetcher contentType="news-articles" limit={5}>
//   {({ content, loading, error }) => (
//     loading ? <LoadingSpinner /> :
//     error ? <ErrorMessage message={error} /> :
//     <NewsList articles={content} />
//   )}
// </ContentFetcher>