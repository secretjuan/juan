/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Stack
} from '@material-ui/core';

const FormDialog = ({ open, onConfirm, text }) => {
  const handConfirmDialog = () => {
    onConfirm();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle sx={{ textAlign: 'center', pt: 5, pb: 0 }}>
          <Typography variant="h4">Sworn Statement</Typography>
        </DialogTitle>
        <DialogContent sx={{ my: 2, mx: 3 }}>
          <DialogContentText>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
              {text}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'block', pb: 5, px: 5 }}>
          <Stack row>
            <Button color="primary" variant="contained" onClick={handConfirmDialog}>
              Ok
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
