import React, { useState } from 'react';
import {
  VStack,
  Select,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { updateUserProfile } from '../services/firebase';
import { auth } from '../services/firebase';

export default function UserProfileSection() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [quote, setQuote] = useState('');
  const [isEditing, setEditing] = useState(false);

  const userId = auth.currentUser.uid
  const profileData = {
    uid: userId,
    name: name,
    gender: gender,
    location: location,
    birthday: birthday,
    age: age,
    quote: quote,
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Save the changes to the database or perform other actions
    updateUserProfile(userId, profileData);
    setEditing(false);
  };

  const handleCancelClick = () => {
    // Reset the form fields if the user cancels the edit
    setEditing(false);
  };

  return (
    <VStack spacing={4}>
      {isEditing ? (
        <>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Select Gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Quote</FormLabel>
            <Textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" onClick={handleSaveClick}>
            Save
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handleEditClick}>Edit</Button>
      )}
    </VStack>
  );
}
