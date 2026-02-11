export const en = {
  common: {
    loading: 'Loading',
    unavailable: 'Unavailable',
    available: 'Available',
  },
  home: {
    locationLabel: 'District 7, Ho Chi Minh City',
    prompt: 'Where do you want to play tonight?',
    filterSectionTitle: 'Quick filters',
    filters: {
      today: 'Today',
      tomorrow: 'Tomorrow',
      weekend: 'Weekend',
      under3km: '<3km',
      intermediatePlus: 'Intermediate+',
      mixed: 'Mixed',
      availableOnly: 'Only show open slots',
      genderFlexible: 'Gender flexible',
    },
    nearbySectionTitle: 'Games recruiting near you',
    slotsRemaining: '{{available}}/{{total}} slots open',
    slotsFull: 'FULL ({{booked}}/{{total}})',
    priceByGender: 'Men {{male}} | Women {{female}}',
    priceSplitEvenly: 'Split evenly',
    ratingLine: '{{rating}} • "{{quote}}"',
    actions: {
      join: 'Join Match',
      full: 'No Slots Left',
      viewMore: 'See more games',
      createMatch: 'Create your own match',
    },
    cta: {
      title: 'No suitable game?',
      subtitle: 'Host a social match with your style',
    },
  },
  homeReview: {
    niceClub: 'Great and welcoming club',
    strongTempo: 'Fast pace and fair rotations',
    friendlyPlayers: 'Friendly players for casual games',
    fastPace: 'Strong tempo for competitive rounds',
  },
} as const;
