import { useState } from "react";
import Form from "./components/Form";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import ItemList from "./components/ItemList";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  // console.log(list);
  if (list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = [];
  }
  return list;
};

const setLocaleStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const App = () => {
  const [items, setItems] = useState(getLocalStorage());

  const addItem = (newItemName) => {
    // console.log(newItemName);
    try {
      const newItem = {
        name: newItemName,
        id: nanoid(),
        completed: false,
      };
      // console.log(newItem);
      // setItems([...items, newItem]); refactored before adding locale storage
      const newItems = [...items, newItem];
      setItems(newItems);
      setLocaleStorage(newItems);
      // console.log(items);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeItem = (itemId) => {
    const filtered = items.filter((item) => item.id !== itemId);
    setItems(filtered);
    setLocaleStorage(filtered);
    toast.success("Item removed");
  };

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocaleStorage(newItems);
  };

  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <ItemList items={items} removeItem={removeItem} editItem={editItem} />
      <ToastContainer position="top-center" />
    </section>
  );
};
export default App;

// One liner:
// const defaultList = JSON.parse(localStorage.getItem('list') || '[]')

// Can replace the const getLocaleStorage function. Don't forget to change useState(defaultList);
