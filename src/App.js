import "./App.css"
import { useState } from "react"
import ReactDOM from "react-dom";

function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState()
  const [checked, setChecked] = useState([]);
  // console.log(input)

  const addItem = (e) => {
    if (!input) {
      alert('Please Insert Text!')
      e.preventDefault()
      return
    }
    e.preventDefault()
    const copyTodoList = [...todoList]
    copyTodoList.push(input)
    setTodoList(copyTodoList)
    resetState()
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";


  const deleteItem = (index) => {
    const copyTodoList = [...todoList]
    copyTodoList.splice(index, 1)
    setTodoList(copyTodoList)
    setEditIndex(null)
    resetState()
  }

  const editItem = (item, index) => {

    setInput(todoList[index])
    setEditMode(true)
    setEditIndex(index)
    setInput(item)
    setEditMode(true)
  }

  const updateItem = (e) => {
    e.preventDefault()
    const copyTodoList = [...todoList]
    copyTodoList[editIndex] = input
    setTodoList(copyTodoList)
    resetState()
    setEditIndex(null)

  }

  const resetState = () => {
    setInput('')
    setEditMode(false)
  }

  const clearList = (e) => {
    e.preventDefault()
    const copyTodoList = [...todoList]
    copyTodoList.splice(0, copyTodoList.length)
    setTodoList(copyTodoList)
    setInput("")
  }

  return (
    <>
      <form className="form">
        <div class="mb-3">
          <div className="heading_text">
            <h1>ToDo App</h1>
          </div>
          <br />
          <input
            type="email"
            class="form-control"
            placeholder="Enter ToDo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
        <br />
        <div className="button">
          {editMode ?

            <button type="update" class="btn btn-primary" onClick={updateItem}>
              Update
            </button>
            :
            <button type="submit" class="btn btn-primary" onClick={addItem}>
              Add
            </button>
          }
        </div>
        <br />
        <h1>ToDo List</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item, index) => {
              return (
                <tr style={editIndex === index ? { backgroundColor: 'aqua' } : { backgroundColor: 'white' }}>
                  <th scope="row" >
                    <div className="checkList">
                      <div className="list-container">
                        <div key={index}>
                          <input value={item} type="checkbox" onChange={handleCheck} />
                          <span className={isChecked(item)}>{item}</span>
                        </div>

                      </div>
                    </div>
                  </th>
                  <td >

                    <div className="edit">
                      
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => editItem(item, index)}

                      >
                        Edit
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="delete">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => deleteItem(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </form>
    
      {(todoList.length)?
      <div className="clear">
        <br />
        <button
          type="button"
          class="btn btn-danger"
          onClick={clearList}
        >
          Clear TodoList
        </button>
      </div>
      :
      []}
      <br />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);