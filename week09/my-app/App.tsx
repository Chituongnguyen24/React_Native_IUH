import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initDbAndSeed } from './src/db/db';

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await initDbAndSeed();
      } catch (err:any) {
        console.warn('initDbAndSeed failed at App startup:', err);
        // avoid noisy alerts on environments without sqlite (optional)
        // Alert.alert('DB init', err.message || String(err));
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
