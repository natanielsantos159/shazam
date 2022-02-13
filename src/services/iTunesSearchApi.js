const iTunesSearchApi = async ({ album, artist, title }) => {
  const song = encodeURI(`${title} ${artist} ${album}`).replaceAll("%20", "+");

  const getAlbumsAPI = `https://itunes.apple.com/search?term=${song}&types=songs&limit=6`;

  try {
    const APIResponse = await fetch(getAlbumsAPI);
  
    const { results } = await APIResponse.json();
    console.log(results)
    const { artworkUrl100, trackViewUrl } =
      results.find(({ trackName, artistName, collectionName }) => {
        return (
          artistName.toLowerCase() === artist.toLowerCase() &&
          collectionName.toLowerCase() === album.toLowerCase() &&
          trackName.toLowerCase() === title.toLowerCase()
        );
      }) || results[0] || {};

    if (artworkUrl100) return {
      artwork: artworkUrl100.replace('100x100', '300x300'),
      trackUrl: trackViewUrl
    };
  } catch (err) {
    console.error(err);
  }
};

export default iTunesSearchApi;
