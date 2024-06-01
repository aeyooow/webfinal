"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton, Card, CardContent, Box } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@mui/icons-material/Delete';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-1/2 justify-start'>
        <Typography variant="h4" gutterBottom>Posts</Typography>
        <Formik
          initialValues={{ posts: data.post }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', { ...data, post: values.posts })
              .then(res => {
                mutate('/api/user', { ...data, post: values.posts }, false);
                console.log('Posts updated successfully');
              })
              .catch(err => {
                console.error('Error updating posts:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <FieldArray name="posts">
                {({ push, remove }) => (
                  <div>
                    {values.posts.map((post, index) => (
                      <Card key={index} variant="outlined" style={{ marginBottom: '1rem' }}>
                        <CardContent>
                          <Box display="flex" alignItems="center">
                            <Field
                              name={`posts.${index}.title`}
                              as={TextField}
                              label="Title"
                              InputProps={{ style: { color: 'white' } }}
                              InputLabelProps={{ style: { color: 'darkgray' } }}
                              style={{ color: 'white', marginRight: '1rem', flex: 1 }}
                            />
                            <Field
                              name={`posts.${index}.content`}
                              as={TextField}
                              label="Content"
                              InputProps={{ style: { color: 'white' } }}
                              InputLabelProps={{ style: { color: 'darkgray' } }}
                              style={{ color: 'white', marginRight: '1rem', flex: 2 }}
                            />
                            <IconButton
                              onClick={() => remove(index)}
                              aria-label="delete"
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => push({ title: '', content: '' })}
                      style={{ marginTop: '1rem' }}
                    >
                      Add Post
                    </Button>
                  </div>
                )}
              </FieldArray><br /><br />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Main>
  );
}

export default ProfilePage;
