import React, { useState, useEffect } from 'react';
import { requireAuth } from '../../utils/authUtils';
import { auth } from '../../services/firebase';
import { Text, Box, Heading, Stack } from '@chakra-ui/react';
import UserProfileSection from '../../components/UserProfileSection';
import { getUserData } from '../../services/firebase';

export async function loader({ request }) {
  await requireAuth(request);
  return null;
}

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const userId = auth.currentUser.uid; // Replace with the actual user ID
  console.log(userData);

  const fetchUserData = async () => {
    try {
      const userResult = await getUserData(userId);
      setUserData(userResult);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const formattedBirthday = userData
    ? new Date(userData.birthday).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not specified';

  return (
    <Stack spacing={4} align="center">
      <Heading as="h1" size="xl">
        User Profile
      </Heading>
      <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
        <Text>
          <strong>Name:</strong> {userData?.name}
        </Text>
        <Text>
          <strong>Email:</strong> {auth.currentUser.email}
        </Text>
        {userData ? (
          <Stack spacing={2}>
            <Text>
              <strong>Quote:</strong> {userData.quote}
            </Text>
            <Text>
              <strong>Gender:</strong> {userData.gender || 'Not specified'}
            </Text>
            <Text>
              <strong>Location:</strong> {userData.location || 'Not specified'}
            </Text>
            <Text>
              <strong>Age:</strong> {userData.age}
            </Text>
            <Text>
              <strong>Birthday:</strong> {formattedBirthday}
            </Text>
          </Stack>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </Box>
      <UserProfileSection />
    </Stack>
  );
}
