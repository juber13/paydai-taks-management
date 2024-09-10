/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();
import toast from "react-hot-toast";

export const ContextProvider = ({children}) => {
    const [isDarkMode , setIsDarkMode] = useState(false);
    const [taskLists , setTaskLists] = useState([]);
    const [showModel , setShowModel] = useState(false);
    const [isEditMode , setIsEditMode] = useState(false);
    const  [filterValue , setFilterValue] = useState("");

    const [newTask, setNewTask] = useState({
      title: "",
      des: "",
      dueDate: "",
      completed: false,
      id: new Date(),
    });

    const filterItems = () => {
       return taskLists.filter(task => {
         if(filterValue === true){
           return task.completed;
         }else if(filterValue === false){
          return !task.completed;
         }else{
          return task;
         }
       })
    }

     const handleEdit = (id) => {
      const card = taskLists.find(item =>  item.id === id)
        setShowModel(true);
        setIsEditMode(true);
        setNewTask(card);
      }


     const handleUpdate = (e) => {
       e.preventDefault();     
         setTaskLists(taskLists.map((item) => item.id === newTask.id ? { ...newTask } : item));
        setShowModel(false);
        setIsEditMode(false);
        setNewTask({});
        toast.success("Task Updated!");
     }

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('tasks'));
        if(list) setTaskLists(list)
    },[])

    useEffect(() => {
        if(taskLists.length > 0)
        localStorage.setItem('tasks' , JSON.stringify(taskLists));
    },[taskLists])

    return (
      <MyContext.Provider value={{
        isDarkMode,
        setIsDarkMode,
        taskLists,
        setTaskLists,
        showModel,
        setShowModel, 
        isEditMode , 
        setIsEditMode, 
        filterItems , 
        setFilterValue,
        handleEdit,
        newTask,
        setNewTask,
        handleUpdate
        }}>
        {children}
      </MyContext.Provider>
    );
}