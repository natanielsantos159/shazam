const identifySong = async (file) => {
  const form = new FormData();
  form.append("file", file, "file.mp3");
  const response = await fetch("https://music-identify.p.rapidapi.com/identify", {
    method: "POST",
    headers: {
      "x-rapidapi-host": "music-identify.p.rapidapi.com",
      "x-rapidapi-key": "fc239fa2f3msha65f422dd6b0656p159e5fjsn3dd5f36474a5",
    },
    body: form,
  })
  const json = await response.json();
  return json;
};

export default identifySong;