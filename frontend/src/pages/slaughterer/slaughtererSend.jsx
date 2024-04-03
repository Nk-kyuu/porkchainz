import { Button,TextField,CssBaseline,Grid,Box,Typography,Container,MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarSlaghterer"


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
          <Navbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'white', // เพิ่มสีขาวให้กับกล่อง
              border: '2px solid #ccc', // ขยายขอบกล่องให้ใหญ่ขึ้น
              borderRadius: '12px', // ขอบมนขึ้น
              padding: '20px', // เพิ่ม padding เพื่อให้มีพื้นที่ของข้อความ
              boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)' // เพิ่มเงาให้กล่อง,
            }}
          >
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}> 
                <Button
                  href='/slaughtererProduct'
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ width: '50%' }}
                            >
                              send
                </Button>
              </Box>              
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
        
    );
  }
  
  export default SlaughtererSend;