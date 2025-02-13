import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible , setVisible] = useState(false);
  const location = useLocation();

  useEffect(()=> {
    if(location.pathname.includes('product')) {
        setVisible(true);
    }
    else {
        setVisible(false);
    }
  },[location])

  return showSearch && visible ? (
    <Container fluid className='border-top border-bottom bg-white text-center py-3'>
      <InputGroup className='mx-auto' style={{ maxWidth: '500px' }}>
        <FormControl
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
          className='border border-secondary'
        />
        <Button variant='outline-secondary'>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button variant='' onClick={() => setShowSearch(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </InputGroup>
    </Container>
  ) : null;
};

export default SearchBar;
