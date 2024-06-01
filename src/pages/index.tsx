import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Card, CardContent, Avatar, Paper, Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

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

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: '1rem' }}>{data.name.charAt(0)}</Avatar>
            <div>
              <Typography variant="h3" gutterBottom>{data.name}</Typography>
              <Typography variant="h6" gutterBottom style={{ color: 'gray' }}>{data.email}</Typography>
            </div>
          </Box>
          <Typography variant="body2" gutterBottom style={{ color: 'gray' }}>{data.bio}</Typography>
        </Paper>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Posts</Typography>
        {data.post.map((post, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '1.5rem', backgroundColor: '#1e1e1e', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Main>
  );
};

export default Home;
