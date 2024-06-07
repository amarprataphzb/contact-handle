import './App.css';
import { useState } from 'react';
import { Container, TextField, MenuItem, Button, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ id: null, name: '', gender: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddOrUpdateContact = () => {
    if (!newContact.name || !newContact.gender || !newContact.type) return;

    if (newContact.id) {
      setContacts(contacts.map(contact => 
        contact.id === newContact.id ? newContact : contact
      ));
    } else {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
    }

    setNewContact({ id: null, name: '', gender: '', type: '' });
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const maleCount = contacts.filter(contact => contact.gender === 'Male').length;
  const femaleCount = contacts.filter(contact => contact.gender === 'Female').length;
  const personalCount = contacts.filter(contact => contact.type === 'Personal').length;
  const businessCount = contacts.filter(contact => contact.type === 'Business').length;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact List
      </Typography>
      <Box component="form" sx={{ mb: 4 }} noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Gender"
          name="gender"
          value={newContact.gender}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          select
          label="Type"
          name="type"
          value={newContact.type}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdateContact}
          sx={{ mt: 2 }}
        >
          {newContact.id ? 'Update Contact' : 'Add Contact'}
        </Button>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Contacts
      </Typography>
      <List>
        {contacts.map(contact => (
          <ListItem key={contact.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditContact(contact)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteContact(contact.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={`${contact.name} (${contact.gender}, ${contact.type})`} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h3">
          Statistics
        </Typography>
        <Typography>Male Contacts: {maleCount}</Typography>
        <Typography>Female Contacts: {femaleCount}</Typography>
        <Typography>Personal Contacts: {personalCount}</Typography>
        <Typography>Business Contacts: {businessCount}</Typography>
      </Box>
    </Container>
  );
}

export default App;
