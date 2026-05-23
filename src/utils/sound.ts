import { Audio } from 'expo-av';

const sounds: Record<string, Audio.Sound | null> = {
  questComplete: null,
  levelUp: null,
  bossTest: null,
  penalty: null,
  dailyReset: null,
};

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

async function playSound(key: keyof typeof sounds) {
  if (!soundEnabled) return;
  try {
    const { sound } = await Audio.Sound.createAsync(
      getSoundSource(key),
      { shouldPlay: true, volume: 0.7 }
    );
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch {
    // Sound file not found - silently ignore
  }
}

function getSoundSource(key: string) {
  // Placeholder: these will need actual .mp3 files in assets/sounds/
  // For now, we use a try-catch approach
  const sources: Record<string, any> = {
    questComplete: require('../../assets/sounds/quest_complete.mp3'),
    levelUp: require('../../assets/sounds/level_up.mp3'),
    bossTest: require('../../assets/sounds/boss_test.mp3'),
    penalty: require('../../assets/sounds/penalty.mp3'),
    dailyReset: require('../../assets/sounds/daily_reset.mp3'),
  };
  return sources[key];
}

export const playQuestComplete = () => playSound('questComplete');
export const playLevelUp = () => playSound('levelUp');
export const playBossTest = () => playSound('bossTest');
export const playPenalty = () => playSound('penalty');
export const playDailyReset = () => playSound('dailyReset');
