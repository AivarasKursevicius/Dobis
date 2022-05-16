import React, { useState } from "react";

import TransitionsModal from "../features/modal/Modal";

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(null);

  const show = (id) => {
    setIsVisible(true);
    setId(id);
  };
  const hide = () => {
    setIsVisible(false);
    setId(null);
  };

  const RenderModal = ({ action }) => (
    <React.Fragment>
      {isVisible && (
        <TransitionsModal
          action={action}
          id={id}
          open={isVisible}
          hide={hide}
        />
      )}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};
