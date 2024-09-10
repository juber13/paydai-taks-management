import { useContext } from 'react';
import { MyContext } from './Context.jsx';

const Header = () => {
    const {
      isDarkMode,
      setIsDarkMode,
      setFilterValue,
    } = useContext(MyContext);


      const handleFilter = (e) => {
        const value = e.target.value === "true" ? true : e.target.value === "false" ? false : null;
        setFilterValue(value);
      } 


  return (
    <div className={`header  bg-white  shadow-md border-b-2 p-2 ${ isDarkMode && "dark:bg-black text-white"} 
    flex text-xs item-center justify-between sm:gap-3 text-black`}
    >
      <div className='filters flex flex-1  items-center justify-center gap-2  sm:gap-4'>
        <div className='flex gap-1 cursor-pointer'>
          <input
            type='radio'
            name='task'
            className='text-2xl cursor-pointer'
            value=''
            id='all'
            onChange={handleFilter}
          />
          <label htmlFor='all'>All</label>
        </div>

        <div className='flex gap-1'>
          <input
            type='radio'
            name='task'
            className='text-2xl cursor-pointer'
            value={true}
            id='complete'
            onChange={handleFilter}
          />
          <label htmlFor='complete'>Completed</label>
        </div>

        <div className='flex gap-1'>
          <input
            type='radio'
            name='task'
            className='text-2xl cursor-pointer'
            value={false}
            id='incomplete'
            onChange={handleFilter}
          />
          <label htmlFor='incomplete'>Incomplete</label>
        </div>
      </div>

      <div className='toggle-mode text-right'>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='border p-2 text-xs sm:text-sm rounded-md font-semibold'
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default Header