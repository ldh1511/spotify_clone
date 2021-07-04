export const GET_USER_INFO="GET_USER_INFO";
export const GET_USER_INFO_SUCCESS="GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED="GET_USER_INFO_FAILED";

export const SET_USER_TOKEN="SET_USER_TOKEN";

export const GET_USER_PLAYLISTS="GET_USER_PLAYLISTS";
export const GET_USER_PLAYLISTS_SUCCESS="GET_USER_PLAYLISTS_SUCCESS";
export const GET_USER_PLAYLISTS_FAILED="GET_USER_PLAYLISTS_FAILED";

export const SHOW_LOADING="SHOW_LOADING";
export const HIDE_LOADING="HIDE_LOADING";

export const GET_RECENT_PLAYLISTS="GET_RECENT_PLAYLISTS";
export const GET_RECENT_PLAYLISTS_SUCCESS="GET_RECENT_PLAYLISTS_SUCCESS";
export const GET_RECENT_PLAYLISTS_FAILED="GET_RECENT_PLAYLISTS_FAILED";

export const GET_CONTENT_HOME="GET_CONTENT_HOME";
export const GET_CONTENT_HOME_SUCCESS="GET_CONTENT_HOME_SUCCESS";
export const GET_CONTENT_HOME_FAILED="GET_CONTENT_HOME_FAILED";

export const GET_TRACKS_PLAYLIST="GET_TRACKS_PLAYLIST";
export const GET_TRACKS_PLAYLIST_SUCCESS="GET_TRACKS_PLAYLIST_SUCCESS";
export const GET_TRACKS_PLAYLIST_FAILED="GET_TRACKS_PLAYLIST_FAILED";

export const SHOW_CONTENT_LOADING="SHOW_CONTENT_LOADING";
export const HIDE_CONTENT_LOADING="HIDE_CONTENT_LOADING";

export const GET_CATEGORY="GET_CATEGORY";
export const GET_CATEGORY_SUCCESS="GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILED="GET_CATEGORY_FAILED";

export const GET_CATEGORIES="GET_CATEGORIES";
export const GET_CATEGORIES_SUCCESS="GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED="GET_CATEGORIES_FAILED";

export const SEARCH="SEARCH";
export const SEARCH_VALUE="SEARCH_VALUE";

export const SEARCH_PLAYLISTS="SEARCH_PLAYLISTS";
export const SEARCH_PLAYLISTS_RESULT="SEARCH_PLAYLISTS_RESULT";

export const SEARCH_TRACKS="SEARCH_TRACKS";
export const SEARCH_TRACKS_RESULT="SEARCH_TRACKS_RESULT";

export const SEARCH_ALBUMS="SEARCH_ALBUMS";
export const SEARCH_ALBUMS_RESULT="SEARCH_ALBUMS_RESULT";

export const SEARCH_ARTISTS="SEARCH_ARTISTS";
export const SEARCH_ARTISTS_RESULT="SEARCH_ARTISTS_RESULT";

export const GET_ARTIST="GET_ARTIST";
export const GET_ARTIST_SUCCESS="GET_ARTIST_SUCCESS";
export const GET_ARTIST_FAILED="GET_ARTIST_FAILED";

export const GET_ARTIST_TOP_TRACK="GET_ARTIST_TOP_TRACK";
export const GET_ARTIST_TOP_TRACK_SUCCESS="GET_ARTIST_TOP_TRACK_SUCCESS";
export const GET_ARTIST_TOP_TRACK_FAILED="GET_ARTIST_TOP_TRACK_FAILED";

export const GET_ALBUM_TRACK="GET_ALBUM_TRACK";
export const GET_ALBUM_TRACK_SUCCESS="GET_ALBUM_TRACK_SUCCESS";
export const GET_ALBUM_TRACK_FAILED="GET_ALBUM_TRACK_FAILED";

export const GET_ALBUM="GET_ALBUM";
export const GET_ALBUM_SUCCESS="GET_ALBUM_SUCCESS";
export const GET_ALBUM_FAILED="GET_ALBUM_FAILED";

export const GET_ARTIST_ALBUM="GET_ARTIST_ALBUM";
export const GET_ARTIST_ALBUM_SUCCESS="GET_ARTIST_ALBUM_SUCCESS";
export const GET_ARTIST_ALBUM_FAILED="GET_ARTIST_ALBUM_FAILED";

export const GET_ARTIST_FOLLOWED="GET_ARTIST_FOLLOWED";
export const GET_ARTIST_FOLLOWED_SUCCESS="GET_ARTIST_FOLLOWED_SUCCESS";
export const GET_ARTIST_FOLLOWED_FAILED="GET_ARTIST_FOLLOWED_FAILED";

export const FOLLOW_ARTIST="FOLLOW_ARTIST";
export const FOLLOW_ARTIST_SUCCESS="FOLLOW_ARTIST_SUCCESS";
export const FOLLOW_ARTIST_FAILED="FOLLOW_ARTIST_FAILED";

export const UNFOLLOW_ARTIST="UNFOLLOW_ARTIST";
export const UNFOLLOW_ARTIST_SUCCESS="UNFOLLOW_ARTIST_SUCCESS";
export const UNFOLLOW_ARTIST_FAILED="UNFOLLOW_ARTIST_FAILED";

export const GET_SAVED_TRACKS="GET_SAVED_TRACKS";
export const GET_SAVED_TRACKS_SUCCESS="GET_SAVED_TRACKS_SUCCESS";
export const GET_SAVED_TRACKS_FAILED="GET_SAVED_TRACKS_FAILED";

export const GET_SAVED_ALBUMS="GET_SAVED_ALBUMS";
export const GET_SAVED_ALBUMS_SUCCESS="GET_SAVED_ALBUMS_SUCCESS";
export const GET_SAVED_ALBUMS_FAILED="GET_SAVED_ALBUMS_FAILED";

export const GET_SAVED_SHOWS="GET_SAVED_SHOWS";
export const GET_SAVED_SHOWS_SUCCESS="GET_SAVED_SHOWS_SUCCESS";
export const GET_SAVED_SHOWS_FAILED="GET_SAVED_SHOWS_FAILED";

export const GET_SAVED_EPISODES="GET_SAVED_EPISODES";
export const GET_SAVED_EPISODES_SUCCESS="GET_SAVED_EPISODES_SUCCESS";
export const GET_SAVED_EPISODES_FAILED="GET_SAVED_EPISODES_FAILED";

export const OPEN_MODAL="OPEN_MODAL";
export const CLOSE_MODAL="CLOSE_MODAL";

export const UPLOAD_PLAYLIST_IMAGE="UPLOAD_PLAYLIST_IMAGE";
export const UPLOAD_PLAYLIST_IMAGE_SUCCESS="UPLOAD_PLAYLIST_IMAGE_SUCCESS";
export const UPLOAD_PLAYLIST_IMAGE_FAILED="UPLOAD_PLAYLIST_IMAGE_FAILED";

export const GET_CURRENT_IMG="GET_CURRENT_IMG";

export const UPDATE_PLAYLIST_DETAIL="UPDATE_PLAYLIST_DETAIL";
export const UPDATE_PLAYLIST_DETAIL_SUCCESS="UPDATE_PLAYLIST_DETAIL_SUCCESS";
export const UPDATE_PLAYLIST_DETAIL_FAILED="UPDATE_PLAYLIST_DETAIL_FAILED";

export const ADD_ITEM_TO_PLAYLIST="ADD_ITEM_TO_PLAYLIST";
export const ADD_ITEM_TO_PLAYLIST_SUCCESS="ADD_ITEM_TO_PLAYLIST_SUCCESS";
export const ADD_ITEM_TO_PLAYLIST_FAILED="ADD_ITEM_TO_PLAYLIST_FAILED";

// function constants
export const  getBase64=(file)=>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }