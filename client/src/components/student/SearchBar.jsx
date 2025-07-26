import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'


function SearchBar({data}) {
  
    const  navigate = useNavigate();
    const [input, setInput] = useState(data?data:'');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/course-list/'+input);
    }

  return (
    <div>
      <form action="" onSubmit={handleSearch} className='flex items-center justify-center w-full bg-gray-800 rounded-full px-4 py-2 shadow-2xl shadow-blue-950'>
        <FontAwesomeIcon className='text-white' icon={faSearch} />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for courses"
          className="w-full h-full outline-none bg-transparent text-white placeholder:text-gray-400 px-2 py-1"
        />
        <button className='text-white cursor-pointer hover:text-gray-400' type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
