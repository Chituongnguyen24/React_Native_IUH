import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ex01 } from './src/exercises/ex01';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Bài 1:Print numbers from 1 to 10 </Text>
       <Text>{ex01().join(", ")}</Text>
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
