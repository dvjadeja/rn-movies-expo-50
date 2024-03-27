export const fetchWatchListMovies = async () => {
  const url =
    'https://api.themoviedb.org/3/account/21140883/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE3MzNhMzg5NjRjMzhmMDU4YjQwMTNjM2NkODdkNiIsInN1YiI6IjY2MDJmOWYwNDU5YWQ2MDE4N2ZjNGRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xtufuokCNDSRDxF6rGGP6FBIBMHR0zAStKdp-yo8OUs',
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Movie');
  }

  const json = await res.json();
  return json?.results;
};

export const addMovieToWatchList = async (movieId: number) => {
  const url = 'https://api.themoviedb.org/3/account/21140883/watchlist';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE3MzNhMzg5NjRjMzhmMDU4YjQwMTNjM2NkODdkNiIsInN1YiI6IjY2MDJmOWYwNDU5YWQ2MDE4N2ZjNGRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xtufuokCNDSRDxF6rGGP6FBIBMHR0zAStKdp-yo8OUs',
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Movie');
  }

  const json = await res.json();
  return json;
};
