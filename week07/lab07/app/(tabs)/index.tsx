import { Image, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>A premium online store for sporter and their stylish choice</Text>
      <View style={styles.card} />
      <Image style={styles.cardImage} source={require('../assets/images/blue-bike.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 30,
    height: 1,
    width: 1,
    backgroundColor: '#F8E6E5',
    borderRadius: 8,
  },
  cardImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});