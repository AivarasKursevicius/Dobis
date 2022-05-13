import React, { useState, useEffect, createContext } from "react";
import { db } from "../../app/firebase";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "@firebase/database";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TransitionGroup } from "react-transition-group";
import "./TaskList.css";
import RenderTask from "./Task";
import { useModal } from "../modal/useModal";

const TaskList = (props) => {
  const { show, RenderModal } = useModal();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");
  const [isError, setIsError] = useState(false);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  //read
  useEffect(() => {
    const starCountRef = ref(db, `${props.title}`);
    onValue(starCountRef, (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        const sortedData = Object.values(data)
          .slice()
          .sort((a, b) => b.date - a.date);
        sortedData.map((todo) => {
          return setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, [props]);

  const writeToDatabase = () => {
    if (todo !== "") {
      setIsError(false);
      const id = uid();
      const newTask = {
        id,
        todo,
        complete: false,
        date: new Date().getTime(),
      };
      set(ref(db, `${props.title}/${id}`), newTask);
      setTodo("");
    } else {
      setIsError(true);
    }
  };

  const handleDelete = (id) => {
    remove(ref(db, `/${props.title}/${id}`));
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempId(todo.id);
    setTodo(todo.todo);
  };

  const handleSubmitChange = () => {
    if (todo !== "") {
      setIsError(false);
      update(ref(db, `/${props.title}/${tempId}`), {
        todo,
        id: tempId,
      });
      setTodo("");
      setIsEdit(false);
    } else {
      setIsError(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isEdit ? handleSubmitChange() : writeToDatabase();
    }
  };

  const handleCancel = () => {
    setTodo("");
    setIsEdit(false);
    setIsError(false);
  };

  const handleCompleted = (todo) => {
    update(ref(db, `/${props.title}/${todo.id}`), {
      complete: !todo.complete,
      id: todo.id,
    });
  };

  return (
    <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
      <CardContent>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          {props.title}
        </Typography>
      </CardContent>

      <CardContent>
        <Box className="card-c-i">
          <TextField
            sx={{ flexGrow: 1 }}
            error={isError}
            id="filled-hidden-label-small"
            variant="filled"
            label={
              isError
                ? `${props.placeholder} cannot be empty`
                : props.placeholder
            }
            size="small"
            type="itm-txt"
            value={todo}
            onChange={handleTodoChange}
            onKeyPress={handleEnter}
          />
          {isEdit ? (
            <>
              <IconButton onClick={handleSubmitChange} component="span">
                <CheckCircleIcon baseclassname="fas" fontSize="large" />
              </IconButton>
              <IconButton
                onClick={handleCancel}
                aria-label="cancel"
                component="span"
              >
                <CancelIcon baseclassname="fas" fontSize="large" />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={writeToDatabase} component="span">
              <AddCircleIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </CardContent>
      <CardContent>
        <List>
          <Box className="list">
            <TransitionGroup>
              {todos.map(({ todo, complete, id }) =>
                RenderTask({
                  todo,
                  complete,
                  id,
                  handleUpdate,
                  handleCompleted,
                  props,
                  show,
                })
              )}
            </TransitionGroup>
          </Box>
        </List>
        <RenderModal action={handleDelete} />
      </CardContent>
    </Card>
  );
};

export default TaskList;
