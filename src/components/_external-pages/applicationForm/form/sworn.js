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

const SwornStatement = ({ open, onConfirm }) => {
  const handleConfirmSworn = () => {
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
              Ako ay nag aapplay upang maging empleyado ng 7-Star Manpower Services of the Philippines Corporation na
              nagpapatunay na lahat ng impormasyon na aking isasaad sa aplikasyon ay pawang katotohanan lamang.
              <br />
              <br />
              Naiintindihan ko rin na ang pagbibigay ko ng maling impormasyon na aking isasaad sa applikasyon ay pawang
              katotohanan lamang. Naiintindihan ko rin na ang pagbibigay ko ng maling impormasyon ay makakaapekto sa
              pagkakataon ko upang matanggap sa trabaho. Sa pagpapatibay ng Batas ng Labor Code of the Philippines,
              bukas din sa aking kaalaman na ang mga impormasyon na aking ilalagay tulad ng aking edukasyon,
              kwalipikasyon at dating trabaho ay parte ng aking pag-aaplay at kinakailangang malaman.
              <br />
              <br />
              Bilang parte ng aking pag-aaplay, ako ay sumasang ayon sa mga batas at panuntunang mayroon ang 7-Star
              Manpower Services of the Philippines Corporation, kung saan ito ay maaaring mabago, alisin at ibahin ano
              mang oras, sa kadahilanang pagbibigay ko ng maling impormasyon galing sa akin. Aking ipinagtitibay na ang
              lahat ng impormasyon na aking, ibinabanggit at isiniwalat ay pawing katotohanan lamang. Akin din
              naiintindihan na ano mang kasinungalingan na aking nabangit ay may katumbas na parusa na naaayon sa batas,
              na maaaring hindi ko na maipagpatuloy ang aking pag-aplay o ako ay matanggal kapag napatunayan na ang
              lahat ng aking sinabi ay hindi totoo at pagpapanggap lamang upang magkatrabaho.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'block', pb: 5, px: 5 }}>
          <Stack row>
            <Button color="primary" variant="contained" onClick={handleConfirmSworn}>
              Ok
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SwornStatement;
