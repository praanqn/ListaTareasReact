import React, { useState, useEffect } from 'react';
import Button from "../../components/Button/Button";
import Input from '../../components/Input/Input';
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
    setInputValue(event.target.value);
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

  return (
    <div>
      
      <h1>Lista de Tareas</h1>
      <p style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={'Agregar una nueva tarea'}
      />
      
      <Button onClick={handleAddTodo} text="Agregar Tarea" />
      </p>
      <p style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={'Buscar Tareas'}
      />
      </p>
      
      {filteredTodos.length === 0 ? (
        <p>No hay tareas para mostrar!</p>
      ) : (
      <div className={style.panelTareas}>  
        <table className={style.tablaTareas}>
          {filteredTodos.map(todo => (
            
              <tr>
              <td><input  type="checkbox" key={todo.id} className={style.tareaPendiente}
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)} /></td>
                <td>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.description}</span>
              </td>
              <td><Button onClick={() => handleDeleteTodo(todo.id)} text ="Borrar Tarea" /></td>
            </tr>
          ))}
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
