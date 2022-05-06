import React, { useState, useEffect } from "react";
import { db } from "../../utils/Firebase";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "@firebase/database";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./TaskList.css";
import { useSelector, useDispatch } from "react-redux";

function renderItem({
  todo,
  complete,
  id,
  handleUpdate,
  handleDelete,
  handleCompleted,
  props,
}) {
  return (
    <CSSTransition key={id} timeout={400} classNames="item">
      <ListItem
        key={id}
        secondaryAction={
          <>
            <IconButton
              onClick={() => handleUpdate({ todo, id })}
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        {props.renderAvatar ? (
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
        ) : (
          <></>
        )}

        <ListItemText
          onClick={() => handleCompleted({ complete, id })}
          primary={todo}
          className="itm-txt"
          sx={{
            textDecoration: complete ? "line-through" : "none",
            textDecorationThickness: "2px",
          }}
        />
      </ListItem>
    </CSSTransition>
  );
}

const TodoList = (props) => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.value);
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
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    if (todo !== "") {
      setIsError(false);
      const id = uid();
      set(ref(db, `${props.title}/${id}`), {
        id,
        todo,
        complete: false,
      });
      setTodo("");
    } else {
      setIsError(true);
    }
  };
  //delete
  const handleDelete = (id) => {
    remove(ref(db, `/${props.title}/${id}`));
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempId(todo.id);
    setTodo(todo.todo);
  };
  //update
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
    <Card className="card">
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
                renderItem({
                  todo,
                  complete,
                  id,
                  handleUpdate,
                  handleDelete,
                  handleCompleted,
                  props,
                })
              )}
            </TransitionGroup>
          </Box>
        </List>
      </CardContent>
    </Card>
  );
};

export default TodoList;
