/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { MyContext } from "./Context";
import toast from "react-hot-toast";

const Model = () => {
  const { setShowModel, showModel, taskLists, setTaskLists , isDarkMode , isEditMode , newTask , setNewTask , handleUpdate} = useContext(MyContext);
  console.log(isEditMode)
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const addTask = (e) => {
    e.preventDefault();
    console.log('logging');
    if (newTask.title && newTask.des && newTask.dueDate) {
      // Ensure all fields are filled
      setTaskLists([...taskLists, newTask]);
      setNewTask({ title: "", des: "", dueDate: "", completed: false }); // Reset newTask
      setShowModel(false);
      toast.success("Task added!");
    } else {
      toast.error("Please fill in all fields."); // Error message for empty fields
    }
  };

  return (
    <div
      className={`fixed bg-[rgba(0,0,0.9)] z-10 inset-0 p-3 ${
        showModel ? "block" : "hidden"
      }`}
    >
      <div
        className='close-btn text-white absolute right-4 border p-1 text-sm w-fit rounded-md cursor-pointer'
        onClick={() => setShowModel(false)}
      >
        Close
      </div>
      <form
        className={`border max-w-xl m-auto mt-[10%] p-10 rounded-md shadow-lg flex flex-col gap-3 ${isDarkMode ? 'bg-black text-white' : 'bg-white'}`}
        onSubmit={isEditMode ? handleUpdate : addTask}
      >
        <div className='flex flex-col relative'>
          <label htmlFor='title' className={`${isDarkMode  ? 'text-white' : 'text-black'}`}>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter title...'
            className={`p-2 rounded-md outline-none border text-sm focus:outline-none ${isDarkMode && 'bg-gray-800'}`}
            value={newTask.title}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='des' className={`${isDarkMode  ? 'text-white' : 'text-black'}`}>
            Description
          </label>
          <textarea
            id='des'
            name='des'
            placeholder='Enter Description...'
            className={`p-2 rounded-md outline-none resize-none border text-sm ${isDarkMode && 'bg-gray-800'}`}
            value={newTask.des}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='dueDate' className={`${isDarkMode  ? 'text-white' : 'text-black'}`}>
            Due Date
          </label>
          <input
            type='date'
            id='dueDate'
            name='dueDate'
            className={`p-2 rounded-md outline-none border text-sm ${isDarkMode && 'bg-gray-800'}`}
            min={new Date().toISOString().split("T")[0]}
            value={newTask.dueDate}
            onChange={handleChange}
          />
        </div>

        <button
          className='border p-2 bg-green-400 font-semibold rounded-md hover:bg-green-300 text-white mt-3'
          type='submit'
        >
          {isEditMode ? "Save" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default Model;
