import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { loginAndSaveToken } from '../../../Api/user';



export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // const LoginSchema = Yup.object().shape({
  //   phoneNum: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone Number is required'),
  //   fcmToken: Yup.string().required('FCM-Token is required'),
  // });
  useEffect(() => {
    loginAndSaveToken();
  }, []);
  const formik = useFormik({
    initialValues: {
      phoneNum: '',
      fcmToken: '',
      remember: true,
    },
    // validationSchema: LoginSchema,
    onSubmit: async () => {
      console.log(values)
      navigate('/dashboard', { replace: true });
      // await loginUser(values.phoneNum, values.fcmToken).then((res) => {
      //   console.log(res)
      // })
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Phone Number"
            {...getFieldProps('phoneNum')}
            error={Boolean(touched.phoneNum && errors.phoneNum)}
            helperText={touched.phoneNum && errors.phoneNum}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="FCM Token"
            {...getFieldProps('fcmToken')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.fcmToken && errors.fcmToken)}
            helperText={touched.fcmToken && errors.fcmToken}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
