import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Image, ActivityIndicator } from 'react-native';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setLoading(true);
      fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const renderResultItem = ({ item }: { item: any }) => (
    <View style={styles.resultItem}>
      {item.show.image && (
        <Image source={{ uri: item.show.image.medium }} style={styles.resultImage} />
      )}
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultTitle}>{item.show.name}</Text>
        <Text style={styles.resultSummary}>{item.show.summary ? item.show.summary.replace(/<[^>]+>/g, '') : 'No summary available'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.show.id.toString()}
          renderItem={renderResultItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  resultImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSummary: {
    fontSize: 14,
    color: '#555',
  },
});

export default SearchScreen;
