export async function requestPermissions(): Promise<boolean> {
  return false;
}

export async function scheduleMorningReminder(_hour: number = 7) {}

export async function scheduleEveningReminder(_hour: number = 21) {}

export async function sendLevelUpNotification(_level: number, _rank: string) {}

export async function sendStreakNotification(_streak: number) {}
