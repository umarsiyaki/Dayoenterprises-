import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { text }]);
  };

  return (
    <div>
      <TodoList todos={todos} />
      <AddTodo addTodo={addTodo} />
    </div>
  );
}
function App() {
  const [todos, setTodos] = React.useState([]);

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <AddTodo addTodo={addTodo} />
    </div>
  );
}
function App() {
  const [todos, setTodos] = React.useState([]);

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo, index) =>
        index === id ? { text: newText } : todo
      )
    );
  };

  return (
    <div>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <AddTodo addTodo={addTodo} />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));