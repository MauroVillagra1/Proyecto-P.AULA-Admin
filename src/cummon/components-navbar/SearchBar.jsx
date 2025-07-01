import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Form className="mb-3 search-bar">
      <Form.Control
        type="text"
        placeholder="Buscar aula..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;
