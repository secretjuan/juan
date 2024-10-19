import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ExampleDialog({showDialog, handleClose, link}) {

  const handleAccept = () =>{
    
    window.open(link.substring(0, link.length-2))
  }
 

  return (
    <div>
      <Dialog 
        open={showDialog} 
        onClose={handleClose}
        sx={{
            '& .MuiDialog-paper': {
              width: '80%', // Adjust the width as needed
              height: '40%'
              //maxWidth: '600px', // Optional: Set a maximum width
            },
          }}
        >
        <DialogTitle>Please Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is pre employment examination.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExampleDialog;
