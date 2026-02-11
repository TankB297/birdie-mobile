import type { NearbyGame } from '@/features/home/types/home.types';
import { HOME_PRIMARY_COVER_IMAGE_URL } from '@/features/home/constants/home.constants';

const defaultCoverImageUrl = HOME_PRIMARY_COVER_IMAGE_URL;

const nearbyGamesMock: NearbyGame[] = [
  {
    id: 'game_1',
    day: 'today',
    startTime: '19:30',
    endTime: '21:30',
    courtName: 'Sân Phú Mỹ',
    courtAddress: 'Phú Mỹ Hưng, Quận 7, TP.HCM',
    distanceKm: 2.1,
    clubName: 'CLB Nice Smash',
    totalSlots: 6,
    bookedSlots: 3,
    malePriceLabel: '70k',
    femalePriceLabel: '50k',
    splitEvenly: false,
    level: 'intermediatePlus',
    format: 'mixed',
    rating: 4.6,
    reviewQuoteKey: 'homeReview.niceClub',
    genderFlexible: true,
    coverImageUrl: defaultCoverImageUrl,
  },
  {
    id: 'game_2',
    day: 'today',
    startTime: '20:00',
    endTime: '22:00',
    courtName: 'Sân Tân Bình',
    courtAddress: 'Đường Bạch Đằng, Tân Bình, TP.HCM',
    distanceKm: 4.5,
    clubName: 'Smasholic Crew',
    totalSlots: 6,
    bookedSlots: 6,
    malePriceLabel: '0k',
    femalePriceLabel: '0k',
    splitEvenly: true,
    level: 'intermediatePlus',
    format: 'mixed',
    rating: 4.8,
    reviewQuoteKey: 'homeReview.strongTempo',
    genderFlexible: true,
    coverImageUrl: defaultCoverImageUrl,
  },
  {
    id: 'game_3',
    day: 'tomorrow',
    startTime: '18:30',
    endTime: '20:30',
    courtName: 'Sân Vạn Kiếp',
    courtAddress: 'Vạn Kiếp, Bình Thạnh, TP.HCM',
    distanceKm: 2.8,
    clubName: 'River Smash',
    totalSlots: 8,
    bookedSlots: 4,
    malePriceLabel: '65k',
    femalePriceLabel: '50k',
    splitEvenly: false,
    level: 'beginner',
    format: 'mixed',
    rating: 4.4,
    reviewQuoteKey: 'homeReview.friendlyPlayers',
    genderFlexible: true,
    coverImageUrl: defaultCoverImageUrl,
  },
  {
    id: 'game_4',
    day: 'weekend',
    startTime: '07:00',
    endTime: '09:00',
    courtName: 'Sân Gia Định',
    courtAddress: 'Công viên Gia Định, Gò Vấp, TP.HCM',
    distanceKm: 2.4,
    clubName: 'Morning Birdie',
    totalSlots: 6,
    bookedSlots: 2,
    malePriceLabel: '80k',
    femalePriceLabel: '60k',
    splitEvenly: false,
    level: 'advanced',
    format: 'menOnly',
    rating: 4.7,
    reviewQuoteKey: 'homeReview.fastPace',
    genderFlexible: false,
    coverImageUrl: defaultCoverImageUrl,
  },
];

export async function fetchNearbyGamesApi(): Promise<NearbyGame[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nearbyGamesMock);
    }, 200);
  });
}
