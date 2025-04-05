import { useState } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("info");

  const showMessage = (msg: string, level: typeof severity = "info") => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return {
    open,
    message,
    severity,
    showMessage,
    handleClose,
  };
};
