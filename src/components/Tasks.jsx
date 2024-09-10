import Model from './Model';
import { useContext } from 'react';
import { MyContext } from './Context';
import Card from './Card';
const Tasks = () => {
  const {showModel} = useContext(MyContext);

  return (
    <>
      <Card/>
      {showModel && <Model />}
    </>
  );
}

export default Tasks