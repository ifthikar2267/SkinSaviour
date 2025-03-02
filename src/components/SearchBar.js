import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [listening, setListening] = useState(false);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('product')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice search. Try using Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      recognition.stop();
      setListening(false);
    };

    recognition.onerror = () => {
      alert('Voice recognition failed. Please try again.');
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return showSearch && visible ? (
    <Container fluid className='border-top border-bottom bg-white text-center py-3'>
      <InputGroup className='mx-auto' style={{ maxWidth: '500px' }}>
        <FormControl
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search for products...'
          className='border border-secondary'
        />
        {/* Search Button */}
        <Button variant='outline-secondary'>
          <FontAwesomeIcon icon={faSearch} />
        </Button>

        {/* Voice Search Button */}
        <Button variant='' onClick={startVoiceSearch} disabled={listening}>
          <FontAwesomeIcon icon={faMicrophone} className={listening ? 'text-danger' : ''} />
        </Button>

        {/* Close Button */}
        <Button variant='' onClick={() => setShowSearch(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </InputGroup>
    </Container>
  ) : null;
};

export default SearchBar;
