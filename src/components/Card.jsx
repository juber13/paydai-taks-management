import checkBoxSvg from "../assets/checkbox.svg";
import editIcon from "../assets/edit.svg";
import { useContext, useState } from "react";
import { MyContext } from "./Context";
import toast from "react-hot-toast";

const Card = () => {
  const {
    setShowModel,
    taskLists,
    setTaskLists,
    filterItems,
    isDarkMode,
    setIsEditMode,
    handleEdit,
  } = useContext(MyContext);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Manage which task is being confirmed for deletion

  const handleStatusUpdate = (index) => {
    const newUpdatedTaskList = [...taskLists];
    newUpdatedTaskList[index].completed = !newUpdatedTaskList[index].completed;
    setTaskLists(newUpdatedTaskList);
  };

  const handleDelete = (id) => {
    setTaskLists(taskLists.filter((task) => task.id !== id));
    setConfirmDeleteId(null); // Hide the confirmation popup
    toast.success("Task Deleted!");
  };

  return (
    <div
      className={`w-full min-h-screen h-screen ${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-br from-purple-100 via-orange-50 to-transparent"
      }`}
    >
      <div className='task-container flex flex-col sm:flex-row p-8 gap-3'>
        {filterItems(taskLists)?.map((list, index) => {
          return (
            <div
              className={`card sm:w-[300px] max-w-xl h-[180px] ${
                isDarkMode ? "bg-gray-800 text-white border-none" : "bg-white"
              } border p-6 shadow-md relative`}
              key={index}
            >
              <div className='text-xl font-[300] flex justify-between h-full flex-col'>
                <div className='flex items-center justify-between'>
                  <h2
                    className={`font-medium ${
                      list.completed && "line-through"
                    }`}
                  >
                    {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
                  </h2>

                  <div
                    onClick={() => handleStatusUpdate(index)}
                    className={`relative cursor-pointer h-6 text-xs p-1 min-w-6 border rounded-md flex items-center justify-center transition duration-300 ease-in-out ${
                      list.completed && "bg-green-400"
                    }`}
                  >
                    {list.completed && (
                      <img src={checkBoxSvg} className='text-green-300 w-3' />
                    )}
                  </div>
                </div>
                <hr className={`${isDarkMode && "bg-black"}`} />
                <p className='text-lg text-wrap'>{list.des}</p>
                <div className='flex items-center justify-between w-full'>
                  <small className='text-gray-300'>{list.dueDate}</small>
                  <div className='flex gap-3 items-center'>
                    <div className='tooltip'>
                      <img
                        src={editIcon}
                        alt='edit-svg'
                        className='w-4 cursor-pointer'
                        onClick={() => handleEdit(list.id)}
                      />
                      <span className='tooltip-text'>Edit</span>
                    </div>
                    <button
                      className={`border p-1 rounded-md ${
                        isDarkMode ? "text-white" : "text-black"
                      } text-xs `}
                      onClick={() => setConfirmDeleteId(list.id)} // Set the id of the task to delete
                    >
                      Delete
                    </button>
                    {confirmDeleteId === list.id && (
                      <div
                        className={`absolute  sm:top-40 sm:right-0 right-32 z-10 top-20 bg-white shadow-xl w-[200px] h-[150px] p-3 flex gap-3 items-center rounded-md justify-center flex-col`}
                      >
                        <h2 className='text-sm font-[400]'>
                          Do you really want to delete this
                          <strong>{" " +list.title}</strong>
                        </h2>
                        <div className='flex gap-2 w-full'>
                          <button
                            className='p-2 bg-white text-sm border rounded-md'
                            onClick={() => handleDelete(list.id)}
                          >
                            Yes
                          </button>
                          <button
                            className='p-2 bg-white text-sm border rounded-md'
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='max-w-xl m-auto text-center'>
        <button className={`border p-4 shadow-md hover:shadow-none ${ isDarkMode ? "bg-black text-white" : "bg-white"} rounded-md text-sm font-semibold`}
          onClick={() => setShowModel(true)}
        >
          Add New Task!
        </button>
      </div>
    </div>
  );
};

export default Card;
