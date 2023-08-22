import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  Button
} from '@mui/material';


export default function PromptCrud({ open, title, body, onClose, handleCancel, handleConfirm }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component={'div'}>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

PromptCrud.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.any,
  onClose: PropTypes.func,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
};
