import { Button,TextField,Avatar,CssBaseline,Grid,Box,Typography,Container,MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const SlaughtererSend = () => {
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
      };
      const currencies = [
        {
          value: 'R1',
          label: 'R00001',
        },
        
        {
          value: 'R2',
          label: 'R00002',
        },

        {
          value: 'R3',
          label: 'R00003',
        }
        
        
      ];

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Shipment Information
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="source"                   
                    fullWidth
                    id="source"
                    label="Source"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="destination"
                        defaultValue="R1"
                        helperText="Please select destination">
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </TextField>
                </Grid> 

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="sendDate"
                    label="SendDate"
                    name="sendDate"
                    autoComplete="sendDate"
                  />
                </Grid>
                

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="estimateArrivaltDate"
                    label="EstimateArrivaltDate"
                    name="estimateArrivaltDate"
                    autoComplete="estimateArrivaltDate"
                  />
                </Grid>
                                                              
              </Grid>
              <Button
                href='/slaughterProduct'
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                send
              </Button>              
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
        
    );
  }
  
  export default SlaughtererSend;