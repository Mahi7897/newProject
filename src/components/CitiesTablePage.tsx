import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CitiesTablePage: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');

  const fetchData = async (pageNum: number) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3002/');
      const newData = await response.json();
      setCities(prevData => [...prevData, ...newData.results]);
      setPage(pageNum + 1);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };
console.log(cities);

  useEffect(() => {
    fetchData(page);
  }, []);

  const handleScroll = () => {
    if (window.scrollY !== window.innerHeight && !isLoading && page > 1) {
      fetchData(page - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, page]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  
  return (
    <>
      <h1 className="text-center mt-2">Weather Forecast Web Application</h1>
    <form action="">
    <input type="text" className='form-control' 
    placeholder='Search City By Name.......'
    value={searchText} onChange={handleSearch}
    autoComplete={searchText}
    />
    </form>
    <div className='scroll'>
    <table className='table border bg-info '>
      <tr>
        <th>City Name</th>
        <th>Country Name</th>
        <th>Time Zone</th>
        <th>Population</th>
        <th>Latitude</th>
        <th>longitude</th>
      </tr>
      {filteredCities.map((item:any, index) => (
        <tr key={index}>
         
              <td><Link className='text-white' to={`/weather/${item.name}/${item.coordinates.lat}/${item.coordinates.lon}`}>{item.name}</Link></td>
              <td>{item.cou_name_en}</td>
              <td>{item.timezone}</td>
              <td>{item.population}</td>
              <td>{item.coordinates.lat}</td>
              <td>{item.coordinates.lon}</td>
        </tr>
          // Assuming 'name' is a property of each item
        ))}
      
    </table>
    </div>
    </>
     
  );
};

export default CitiesTablePage;
