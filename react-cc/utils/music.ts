import { AudioPlayer, AudioSource } from 'expo-audio';

const DEFAULT_MUSIC_URL = 'https://audio.jukehost.co.uk/WQF2nafozymUdCIyomH2I1R1v41NO4hk';

let audioPlayer: AudioPlayer | null = null;
let isPlaying = false;
let currentVolume = 0.5;
let currentSource: AudioSource | null = null;

export const initializeMusic = async (url?: string): Promise<void> => {
  try {
    if (audioPlayer) {
      await audioPlayer.remove();
      audioPlayer = null;
    }
    
    const musicUrl = url || DEFAULT_MUSIC_URL;
    audioPlayer = new AudioPlayer(musicUrl);
    audioPlayer.loop = true;
    audioPlayer.volume = currentVolume;
    
    currentSource = musicUrl;
  } catch (error) {
    console.error('Error initializing music:', error);
  }
};

export const playMusic = async (): Promise<void> => {
  try {
    if (audioPlayer && !isPlaying) {
      await audioPlayer.play();
      isPlaying = true;
    }
  } catch (error) {
    console.error('Error playing music:', error);
  }
};

export const pauseMusic = async (): Promise<void> => {
  try {
    if (audioPlayer && isPlaying) {
      await audioPlayer.pause();
      isPlaying = false;
    }
  } catch (error) {
    console.error('Error pausing music:', error);
  }
};

export const setMusicVolume = async (volume: number): Promise<void> => {
  try {
    currentVolume = volume / 100;
    if (audioPlayer) {
      audioPlayer.volume = currentVolume;
    }
  } catch (error) {
    console.error('Error setting music volume:', error);
  }
};

export const muteMusic = async (): Promise<void> => {
  try {
    if (audioPlayer) {
      audioPlayer.volume = 0;
    }
  } catch (error) {
    console.error('Error muting music:', error);
  }
};

export const unmuteMusic = async (): Promise<void> => {
  try {
    if (audioPlayer) {
      audioPlayer.volume = currentVolume;
    }
  } catch (error) {
    console.error('Error unmuting music:', error);
  }
};

export const getIsPlaying = (): boolean => {
  return isPlaying;
};

export const cleanupMusic = async (): Promise<void> => {
  try {
    if (audioPlayer) {
      await audioPlayer.remove();
      audioPlayer = null;
      isPlaying = false;
      currentSource = null;
    }
  } catch (error) {
    console.error('Error cleaning up music:', error);
  }
};

