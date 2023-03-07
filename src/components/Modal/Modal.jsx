/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalView } from './Modal.styled';
import PropTypes from 'prop-types';

import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageURL, tags, onEscape }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscapeDown);
    return () => {
      window.removeEventListener('keydown', handleEscapeDown);
    };
  }, []);

  const handleEscapeDown = e => {
    if (e.code === 'Escape') {
      onEscape();
    }
  };

  return createPortal(
    <ModalOverlay>
      <ModalView>
        <img src={largeImageURL} alt={tags} />
      </ModalView>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
