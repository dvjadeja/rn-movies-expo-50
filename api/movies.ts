const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjE3MzNhMzg5NjRjMzhmMDU4YjQwMTNjM2NkODdkNiIsInN1YiI6IjY2MDJmOWYwNDU5YWQ2MDE4N2ZjNGRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xtufuokCNDSRDxF6rGGP6FBIBMHR0zAStKdp-yo8OUs';
const headers = {
  accept: 'application/json',
  Authorization: 'Bearer ' + apiKey,
};
export const fetchTopRatedMovies = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Movies');
  }

  const json = await res.json();
  return json?.results;
};

export const fetchMovie = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch Movie');
  }

  const json = await res.json();
  return json;
};
