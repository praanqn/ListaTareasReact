import React, { useState, useEffect } from 'react';
import Button from "../../components/Button/Button";
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Checkbox/Checkbox';
import style from "./TodoList.module.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalTareas, setTotalTareas] = useState(0);
  const [completedTareas, setCompletedTareas] = useState(0);

  useEffect(() => {
    setTotalTareas(todos.length);
    setCompletedTareas(todos.filter(todo => todo.completed).length);
  }, [todos]);

  const handleInputChange = (event) => {
    console.log('teclas pres');
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        description: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeclaPresionada = (event) => {
    console.log('Tecla presionada:', event.key);

    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('do validate')
      } 
  };

  return (
    <div>
      
      <h1>Lista de Tareas</h1>
     <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={'Agregar una nueva tarea'}
       // onKeyPress={handleTeclaPresionada}
        onKeyDown={handleKeyDown}
      />
      
      <Button onClick={handleAddTodo} text="Agregar Tarea" />
      </div>
      
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={'Buscar Tareas'}
      />
      
      
      {filteredTodos.length === 0 ? (
        <p>No hay tareas para mostrar con los parametros de búsqueda!</p>
      ) : (
      <div className={style.panelTareas}>  
        <table className={style.tablaTareas}>
          <tbody>
          {filteredTodos.map(todo => (
            
              <tr key={todo.id}>
              <td>
                <Checkbox className={style.tareaPendiente} checked={todo.completed} onChange={() => handleToggleComplete(todo.id)}  />
              
                </td>
                
                <td>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.description}</span>
              </td>
              <td><Button onClick={() => handleDeleteTodo(todo.id)} text ="Borrar Tarea" /></td>
            </tr>
          ))}
          </tbody>
       </table> 
      </div>
      )}
      <p className={style.tareaPendiente}>Tareas Penditentes: {totalTareas - completedTareas}</p>
      <p className={style.tareaCompletada}>Tareas Completadas: {completedTareas}</p>
      <p className={style.tareasTotales}>Total de Tareas: {totalTareas}</p>
    </div>
    
  );
}

export default TodoList;
