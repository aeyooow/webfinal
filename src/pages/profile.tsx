"use client";

import React from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
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
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
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
                <Box marginBottom="1.5rem">
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    InputProps={{ style: { color: 'black' } }}
                    InputLabelProps={{ style: { color: 'black' } }}
                    variant="outlined"
                  />
                </Box>
                <Box marginBottom="1.5rem">
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    InputProps={{ style: { color: 'black' } }}
                    InputLabelProps={{ style: { color: 'black' } }}
                    variant="outlined"
                  />
                </Box>
                <Box marginBottom="1.5rem">
                  <Field
                    name="bio"
                    as={TextField}
                    multiline
                    rows={3}
                    label="Bio"
                    fullWidth
                    InputProps={{ style: { color: 'black' } }}
                    InputLabelProps={{ style: { color: 'black' } }}
                    variant="outlined"
                  />
                </Box>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Main>
  );
}

export default ProfilePage;
