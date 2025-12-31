
export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export interface PoemResponse {
  poem: string;
  message: string;
}
