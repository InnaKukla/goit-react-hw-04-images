
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import { apiFetch } from './services/api';

export function App() {
  const [perPage] = useState(12);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [picturesTags, setPicturesTags] = useState('');
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (picturesTags === '') {
      setPictures([]);
      return;
    }

    apiFetch(picturesTags, page)
      .then(({ hits, totalHits }) => {
        if (!picturesTags) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setPictures(hits);
          setPage(1);
        } else {
          setPictures(prevPictures => [...prevPictures, ...hits]);
          setPage(page);
          setTotalPictures(totalHits);
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [page, picturesTags]);

  //
  const submitHandler = picturesTags => {
    setPicturesTags(picturesTags);
    setPictures([]);
    setPage(1);
    setError(null);
    setLoading(true);
  };

  const handlerButtonLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const totalPages = Math.floor(totalPictures / perPage);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={submitHandler} />
      {loading && <Loader />}
      <ImageGallery pictures={pictures} />
      {totalPages > page && <Button onSubmit={handlerButtonLoadMore} />}
    </div>
  );
}

App.propTypes = {
  pictures: PropTypes.array.isRequired,
  hits: PropTypes.array.isRequired,
  totalHits: PropTypes.number.isRequired,
};
