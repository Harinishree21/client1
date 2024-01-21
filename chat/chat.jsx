import React, { useState } from 'react';
import { Button, TextField, Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      // In a real application, you would send the message to the backend for processing
      // and receive a response from customer support.
      // For simplicity, we're simulating a response here.
      setTimeout(() => {
        setMessages([...messages, { text: 'Thanks for your message!', sender: 'support' }]);
      }, 1000);
      setNewMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ height: '400px', marginTop: '20px', padding: '20px', overflowY: 'auto' }}>
        <Typography variant="h5">Chat</Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText primary={message.text} secondary={message.sender} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <TextField
          fullWidth
          label="Type your message..."
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
          Send
        </Button>
      </div>
    </Container>
  );
};

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Material-UI Chat</h1>
      <Chat />
    </div>
  );
}

export default App;
