import { useState } from "react";
export const useSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const showMessage = (msg, level = "info") => {
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
