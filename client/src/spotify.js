const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
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
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item)=>{
            var parts=item.split('=');
            initial[parts[0]]=decodeURIComponent(parts[1]);
            return initial;
        },{});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
