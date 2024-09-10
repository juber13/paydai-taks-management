import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { ContextProvider } from './components/Context'

function App() {

  return (
    <ContextProvider>
       <Header/>
       <Tasks/>
    </ContextProvider>
  )
}

export default App
