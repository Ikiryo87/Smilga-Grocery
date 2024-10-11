import { useState } from "react";
import { toast } from "react-toastify";

const Form = ({ items, addItem }) => {
  const [newItemName, setNewItemName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(newItemName);
    if (!newItemName) {
      toast.error("invalid input");
      return;
    } else {
      addItem(newItemName);
      toast.success("added item");
      setNewItemName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Grocery Bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          onChange={(e) => setNewItemName(e.target.value)}
          value={newItemName}
        ></input>
        <button className="btn" type="submit">
          Add item
        </button>
      </div>
    </form>
  );
};
export default Form;
