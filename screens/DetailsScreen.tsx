import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DetailsScreenProps } from './DetailsScreenProps';

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.show.image?.medium }} style={styles.thumbnail} />
      <Text style={styles.title}>{movie.show.name}</Text>
      <Text style={styles.summary}>{movie.show.summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
  },
});

export default DetailsScreen;
