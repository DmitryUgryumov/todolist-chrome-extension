import { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const onChangeComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  };

  const onCreateNewTodo = () => {
    setTodos((prev) => [
      {
        id: new Date().getTime(),
        title: newTodo,
        completed: false,
        userId: 1,
      },
      ...prev,
    ]);
    setNewTodo("");
  };

  const onRemoveTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosList = await axios.get<ITodo[]>(
          "https://jsonplaceholder.typicode.com/todos?_start=10&_limit=10",
        );
        setTodos(todosList.data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreateNewTodo();
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>create todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-list__todo">
            <label htmlFor={todo.id.toString()}>{`${index + 1}) ${
              todo.title
            }`}</label>
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id.toString()}
              onChange={() => onChangeComplete(todo.id)}
            />
            <button onClick={() => onRemoveTodo(todo.id)}>remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
