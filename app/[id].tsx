import { View, Text, ActivityIndicator, Image, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';

import { fetchMovie } from '@/api/movies';
import { addMovieToWatchList } from '@/api/watchlist';
const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const client = useQueryClient();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovie(parseInt(id)),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(parseInt(id)),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['watchlist'],
      });
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: movie?.title }} />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`,
        }}
        style={{ width: '100%', height: 300 }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: '500', marginVertical: 10 }}>
          {movie?.title}
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Pressable
            onPress={() => mutate()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
          >
            <FontAwesome name="bookmark-o" size={24} color="black" />
            <Text>Add to Watchlist</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 16 }}>{movie?.overview}</Text>
      </View>
    </View>
  );
};
export default MovieDetails;
