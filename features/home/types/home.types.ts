export type GameDay = 'today' | 'tomorrow' | 'weekend';
export type SkillBand = 'beginner' | 'intermediatePlus' | 'advanced';
export type GameFormat = 'mixed' | 'menOnly' | 'womenOnly';

export type HomeFilterState = {
  day: GameDay;
  under3km: boolean;
  intermediatePlus: boolean;
  mixedOnly: boolean;
  availableOnly: boolean;
  genderFlexible: boolean;
};

export type NearbyGame = {
  id: string;
  day: GameDay;
  startTime: string;
  endTime: string;
  courtName: string;
  distanceKm: number;
  clubName: string;
  courtAddress: string;
  totalSlots: number;
  bookedSlots: number;
  malePriceLabel: string;
  femalePriceLabel: string;
  splitEvenly: boolean;
  level: SkillBand;
  format: GameFormat;
  rating: number;
  reviewQuoteKey: string;
  genderFlexible: boolean;
  coverImageUrl: string;
};
