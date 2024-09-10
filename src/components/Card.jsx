import checkBoxSvg from "../assets/checkbox.svg";
import editIcon from '../assets/edit.svg';
import { useContext } from "react";
import { MyContext } from "./Context";
import toast from "react-hot-toast";
const Card = () => {
     const {setShowModel,taskLists,setTaskLists,filterItems,isDarkMode , setIsEditMode , handleEdit} = useContext(MyContext);
     
     

     const handleStatusUpdate = (index) => {
       console.log(index);
       const newUpdatedTaskList = [...taskLists];
       newUpdatedTaskList[index].completed = !newUpdatedTaskList[index].completed;
       setTaskLists(newUpdatedTaskList);
       console.log(taskLists);
     };

      const handleDelete = (index) => {
        setTaskLists(taskLists.filter((task) => task.id !== index));
        toast.success("task Deleted!");
      };

     


  return (
    <div className={` w-full min-h-screen h-screen ${isDarkMode? "bg-black": "bg-gradient-to-br from-purple-100 via-orange-50 to-transparent"}`}
    >
      <div className='task-container flex flex-col sm:flex-row p-8 gap-3'>
        {filterItems(taskLists)?.map((list, index) => {
          return (
            <div
              className={`card sm:w-[300px] max-w-xl h-[180px] ${isDarkMode ? 'bg-gray-800 text-white border-none' : 'bg-white'} border p-6 shadow-md key={index} ${list.completed && "backdrop-blur-md rounded-md"}`}
              key={index}
            >
              <div className='text-xl font-[300] flex justify-between h-full flex-col'>
                <div className='flex items-center justify-between'>
                  <h2 className={`font-medium ${list.completed && "line-through"}`}>
                    {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
                  </h2>

                  <div
                    onClick={() => handleStatusUpdate(index)}
                    className={`relative cursor-pointer h-6 text-xs p-1 min-w-6 border rounded-md flex items-center justify-center transition duration-300 ease-in-out ${list.completed && "bg-green-400"}`}
                  >
                    {list.completed && (<img src={checkBoxSvg} className=' text-green-300 w-3' />)}
                  </div>

                </div>
                <hr className={` ${isDarkMode && 'bg-black'}`}/>
                <p className='text-lg text-wrap'>{list.des}</p>
                <div className='flex items-center justify-between w-full'>
                  
                  <small className='text-gray-300'>{list.dueDate}</small>
                  
                  <div className="flex gap-3 items-center">

                  <div className="tooltip">
                   <img src={editIcon} alt="edit-svg" className="w-4 cursor-pointer" onClick={() => handleEdit(list.id)}/> 
                   <span className="tooltip-text">Edit</span>
                  </div>
                  <button
                    className={`border p-1 rounded-md ${isDarkMode ? 'text-white' : 'text-black'} text-xs`}
                    onClick={() => handleDelete(list.id)}
                  >
                    Delete
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='max-w-xl m-auto text-center'>
        <button
          className={`border p-4 shadow-md hover:shadow-none ${isDarkMode  ? 'bg-black text-white' : 'bg-white'} rounded-md text-sm font-semibold`}
          onClick={() => setShowModel(true)}
        >
          Add New Task!
        </button>
      </div>
    </div>
  );
}

export default Card