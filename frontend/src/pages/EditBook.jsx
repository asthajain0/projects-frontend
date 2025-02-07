import React , {useEffect, useState} from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} =useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then( (response)=>{
        setAuthor(response.data.author)
        setTitle(response.data.title)
        setPublishYear(response.data.publishYear)
        setLoading(false);
      })
    .catch((error) =>{
        setLoading(false);
        alert('An error occured check console');
        console.log(error);
        });
    
  }, [])
  
  const handleEditBook = ()=>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then( ()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error) =>{
      setLoading(false);
      alert('An error occured check console');
      console.log(error);
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? 
        <Spinner/>
      : '' }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 flex flex-col mx-8'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}
           className='border-1 border-gray-500 px-4 py-2 w-full my-2 rounded-lg' />
        </div>
        <div className='my-4 flex flex-col mx-8'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e)=> setAuthor(e.target.value)}
           className='border-1 border-gray-500 px-4 py-2 w-full my-2 rounded-lg' />
        </div>
        <div className='my-4 flex flex-col mx-8'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text" value={publishYear} onChange={(e)=> setPublishYear(e.target.value)}
           className='border-1 border-gray-500 px-4 py-2 w-full my-2 rounded-lg' />
        </div>
        <button className='p-2 bg-sky-300 m-8 w-[100px] mx-60 rounded-lg' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook