import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { fetchWatchListMovies } from '@/api/watchlist';

import MovieListItem from '@/components/MovieListItem';
import { View } from '@/components/Themed';

export default function WatchList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchListMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
