
const identifySong = async (file) => {
  const form = new FormData();
  form.append("file", file, "file.mp3");

  const response = await fetch("https://music-identify.p.rapidapi.com/identify", {
    method: "POST",
    headers: {
      "x-rapidapi-host": "music-identify.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_APIKEY,
    },
    body: form,
  })
  const json = await response.json();
  return json;
};

export default identifySong;