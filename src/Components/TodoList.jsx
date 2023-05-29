import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "../Css/TodoList.css";
import swal from 'sweetalert';

const getLocalItem = () => {
  let todoItem = localStorage.getItem("List");
  if (todoItem) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};

const TodoList = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(getLocalItem);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [updateTodo, setUpdateTodo] = useState(null);
  const addItem = () => {
    if (search === "") {
      swal("Oops!", "Please Enter a Todo!", "error");
    
    } else if (items.includes(search.toLowerCase())) {
      swal("Oops!", "Todo Already Exist!", "error");
    
    } else if (search !== "" && !toggleIcon) {
      let temp = items.map((element) => {
        if (element.id === updateTodo) {
          return { ...element, name: search };
        }
        return element;
      });
      setItems(temp);
      setToggleIcon(true);
      setSearch("");
      setUpdateTodo(null);
    } else {
      console.log(items);
      const inputData = {
        name: search,
        status: true,
        id: new Date().getTime().toString(),
      };
      setItems([...items, inputData]);
      setSearch("");
    }
  };
  const deleteTodo = (index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Todo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your Todo has been deleted!", {
          icon: "success",
        });
        setItems((element) => {
          return element.filter((element) => {
            return index !== element.id;
          });
        });
      } else {
        swal("Your Todo is safe!");
      }
    });
  };
  const editTodo = (id) => {
    const editItems = items.find((element) => {
      return id === element.id;
    });
    setToggleIcon(false);
    setSearch(editItems.name);
    setUpdateTodo(id);
  };
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main">
      <h1>TodoList</h1>
      <div className="search">
        <input
          type="text"
          className="input-value"
          placeholder="Enter Todo to Add"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        {toggleIcon ? (
          <i className="fa-solid fa-plus btn" onClick={addItem}></i>
        ) : (
          <i className="fa-solid fa-floppy-disk btn" onClick={addItem}></i>
        )}
      </div>
      <div className="todos">
        <ul>
          {items.map((element,index) => {
            return (
              <div className="todoElement">
              <div className="todo" key={element.id}>
                <Todo
                  keys={index}
                  id={element.id}
                  onDelete={deleteTodo}
                  todo={element.name}
                  onEdit={editTodo}
                />
              </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
