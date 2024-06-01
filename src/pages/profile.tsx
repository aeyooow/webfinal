import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const { id, name, email, bio, post } = data; 
  return (
    <Main>
      <Container className='w-1/2 justify-start'>
        <Typography variant="h4">Profile</Typography>
        <Formik
          initialValues={{ id, name, email, bio, post }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', values)
              .then(res => {
                mutate('/api/user', values, false);
                console.log('Profile updated successfully');
              })
              .catch(err => {
                console.error('Error updating profile:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Name"
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'darkgray' } }}
                style={{ color: 'white' }}
              /><br /><br />
              <Field
                name="email"
                as={TextField}
                label="Email"
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'darkgray' } }}
                style={{ color: 'white' }}
              /><br /><br />
              <Field
                name="bio"
                as={TextField}
                multiline
                rows={3}
                label="Bio"
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'darkgray' } }}
                style={{ color: 'white' }}
              /><br /><br />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Main>
  );
}

export default ProfilePage;
