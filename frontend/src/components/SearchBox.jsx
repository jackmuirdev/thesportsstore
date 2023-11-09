import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const {keyword: urlKeyword} = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex me-3">
      <Form.Control type="text" name="q" variant="dark" className="search" onChange={(e) => setKeyword(e.target.value)} value={keyword} placeholder="Search Products..." style={{ width: "300px" }}></Form.Control>
      <Button type="submit" variant="white" className="searchbtn p-2 mx-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox