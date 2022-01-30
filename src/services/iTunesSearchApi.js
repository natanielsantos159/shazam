const iTunesSearchApi = async ({ album, artist, title }) => {
  const song = encodeURI(`${title} ${artist} ${album}`).replaceAll("%20", "+");

  const getAlbumsAPI = `https://itunes.apple.com/search?term=${song}&types=songs&limit=6`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  const { artworkUrl100 } = results.find(
    ({ trackName, artistName, collectionName }) => {
      return artistName === artist && collectionName === album && trackName === title
    }
  ) || results[0];
  if (artworkUrl100) return artworkUrl100;
};

export default iTunesSearchApi;
