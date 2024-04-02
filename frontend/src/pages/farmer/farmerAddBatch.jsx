import { Button, TextField, Avatar, CssBaseline, Grid, Box, Typography, Container, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FarmerAddBatch = () => {
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
    };

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
                        Add Batch
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="batchName"
                                    fullWidth
                                    id="batchName"
                                    label="BatchName"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="quantity"
                                    label="Quantity"
                                    name="quantity"
                                    autoComplete="quantity"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="weight"
                                    label="Weight"
                                    name="weight"
                                    autoComplete="weight"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                            <Button
                                href='/farmerDashPig'
                                variant="contained"
                                color="error"
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="warning"
                                sx={{ ml: 1 }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>

    );
}

export default FarmerAddBatch;
