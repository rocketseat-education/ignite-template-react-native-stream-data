import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.twitch.tv/helix'
})

export { api };
