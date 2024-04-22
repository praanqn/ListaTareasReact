import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import style from "./TodoList.module.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalTareas, setTotalTareas] = useState(0);
  const [completedTareas, setCompletedTareas] = useState(0);

  useEffect(() => {
    setTotalTareas(todos.length);
    setCompletedTareas(todos.filter((todo) => todo.completed).length);
  }, [todos]);

  const handleInputChange = (event) => {
    console.log("teclas pres");
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        description: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeclaPresionada = (event) => {
    console.log("Tecla presionada:", event.key);

    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("do validate");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Lista de Tareas</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Input
              className="input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={"Agregar una nueva tarea"}
              // onKeyPress={handleTeclaPresionada}
              onKeyDown={handleKeyDown}
              style={{ width: "100%" }}
            />
            <Button
              className={style.button}
              onClick={handleAddTodo}
              text="Agregar Tarea"
            />
          </div>
          <div style={{ width: "100%" }}>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={"Buscar Tareas"}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          {filteredTodos.length === 0 ? (
            <p>No hay tareas para mostrar con los parametros de búsqueda!</p>
          ) : (
            <div className={style.panelTareas}>
              <div className={style.tableContainer}>
                {" "}
                {/* Agrega un contenedor para la tabla */}
                <table
                  className={style.tablaTareas}
                  style={{ borderCollapse: "collapse", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th className={style.celda}>Tarea Pendiente</th>
                      <th className={style.celda}>Descripción</th>
                      <th className={style.celda}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTodos.map((todo) => (
                      <tr key={todo.id}>
                        <td className={style.celda}>
                          <Checkbox
                            className={style.tareaPendiente}
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                          />
                        </td>
                        <td className={style.celda}>
                          <span
                            style={{
                              textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {todo.description}
                          </span>
                        </td>
                        <td className={style.celda}>
                          <Button
                            className={style.redButton}
                            onClick={() => handleDeleteTodo(todo.id)}
                            text="Borrar Tarea"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className={style.tareaPendiente}>
        Tareas Pendientes: {totalTareas - completedTareas}
      </p>
      <p className={style.tareaCompletada}>
        Tareas Completadas: {completedTareas}
      </p>
      <p className={style.tareasTotales}>Total de Tareas: {totalTareas}</p>
    </div>
  );
}

export default TodoList;
