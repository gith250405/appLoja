import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JVFAppProvider } from '../context/AppContext';

export default function JVFRootLayout() {
  return (
    <JVFAppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B0F19' },
        }}
      />
    </JVFAppProvider>
  );
}
