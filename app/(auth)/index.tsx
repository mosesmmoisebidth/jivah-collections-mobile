import { View } from 'react-native';
import SignIn from './sign-in';
import { WaveIndicator } from 'react-native-indicators';
import { Redirect } from 'expo-router';
import StorageService from '@/services/storage';
import { useEffect, useState } from 'react';

export default function Page() {


  return <SignIn />;
}
