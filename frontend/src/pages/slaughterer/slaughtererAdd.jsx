import { Button,TextField,Avatar,CssBaseline,Grid,Box,Typography,Container,MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const SlaughtererAdd = () => {
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
          value: '1',
          label: '00001',
        },
        
        {
          value: '2',
          label: '00002',
        },

        {
          value: '3',
          label: '00003',
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
              Product Infomation
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="productName"                   
                    fullWidth
                    id="productName"
                    label="ProductName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="productWeight"
                    label="ProductWeight"
                    name="productWeight"
                    autoComplete="productWeight"
                  />
                </Grid>
                

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="productDate"
                    label="ProductDate"
                    name="productDate"
                    autoComplete="productDate"
                  />
                </Grid>
                             
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="BatchID"
                        defaultValue="1"
                        helperText="Please select BatchID">
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </TextField>
                </Grid>              
              </Grid>
              <Button
                href='/slaughterDash'
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>              
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
        
    );
  }
  
  export default SlaughtererAdd;