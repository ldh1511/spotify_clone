const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://ldh1511.github.io/spotify_clone/";
const clientId = "9a1e71af41074900af7ee6ede5ba105b";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-modify-playback-state",
  "user-follow-modify",
  "user-follow-read",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "ugc-image-upload"
];

export const getTokenFromUrl=()=>{
    return window.location.href.split('code=')[1];
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;
