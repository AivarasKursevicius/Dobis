import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #81c784",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  maxWidth: "95%",
};

export default function TransitionsModal({ open, hide, id, action }) {
  const yesAction = () => {
    action(id);
    hide();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={hide}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            align="center"
            variant="h6"
            component="h2"
            style={{ marginBottom: "15px" }}
          >
            Are you sure you want to delete ?
          </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onClick={() => yesAction()} variant="outlined">
              YES
            </Button>
            <Button onClick={() => hide()} variant="outlined">
              NO
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
