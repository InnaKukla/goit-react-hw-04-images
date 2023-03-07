import { useState } from 'react';
import {
  HeaderSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [picturesTags, setPicturesTags] = useState('');
  // const [setPage] = useState(1);

  const changeTags = e => {
    setPicturesTags(e.currentTarget.value.toLowerCase());
  };

  const handlSubmitForm = e => {
    e.preventDefault();

    if (picturesTags.trim() === '') {
      alert('Enter pictures name');
      return;
    }
    onSubmit(picturesTags);
    setPicturesTags(''); 
    // setPage(1);   
  };

  return (
    <HeaderSearchbar>
      <SearchForm onSubmit={handlSubmitForm}>
        <SearchFormButton type="submit" className="button">
          <span className="button-label">Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={picturesTags}
          onChange={changeTags}
        />
      </SearchForm>
    </HeaderSearchbar>
  );
}
