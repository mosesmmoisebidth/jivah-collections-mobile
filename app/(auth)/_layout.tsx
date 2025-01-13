import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './sign-in';
import SignUp from './sign-up';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" component={SignIn} />
      <Stack.Screen name="sign-up" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
