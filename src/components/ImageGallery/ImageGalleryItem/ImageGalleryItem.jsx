import { useState } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ id, webformatURL, tags, largeImageURL }) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const toggleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  return (
    <GalleryItem key={id} onClick={toggleModal}>
      <GalleryItemImg src={webformatURL} alt={tags} />
      {isVisibleModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onEscape={toggleModal}
        />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
