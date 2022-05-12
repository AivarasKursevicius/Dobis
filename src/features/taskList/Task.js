import React from "react";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { CSSTransition } from "react-transition-group";
import "./TaskList.css";

const RenderTask = ({
  todo,
  complete,
  id,
  handleUpdate,
  handleCompleted,
  props,
  show,
}) => {
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
            <IconButton onClick={() => show(id)} edge="end" aria-label="delete">
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
};

export default RenderTask;
