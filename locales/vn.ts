export const vn = {
  common: {
    loading: 'Dang tai',
    unavailable: 'Khong kha dung',
    available: 'Kha dung',
  },
  home: {
    locationLabel: 'Quan 7, TP.HCM',
    prompt: 'Toi nay ban muon danh o dau?',
    filterSectionTitle: 'Loc nhanh',
    filters: {
      today: 'Hom nay',
      tomorrow: 'Mai',
      weekend: 'Cuoi tuan',
      under3km: '<3km',
      intermediatePlus: 'TB+',
      mixed: 'Mixed',
      availableOnly: 'Chi hien keo con slot',
      genderFlexible: 'Linh hoat gioi tinh',
    },
    nearbySectionTitle: 'Keo dang tuyen gan ban',
    slotsRemaining: '{{available}}/{{total}} slot con trong',
    slotsFull: 'FULL ({{booked}}/{{total}})',
    priceByGender: 'Nam {{male}} | Nu {{female}}',
    priceSplitEvenly: 'Chia deu',
    ratingLine: '{{rating}} • "{{quote}}"',
    actions: {
      join: 'Dang ky danh',
      full: 'Het slot',
      viewMore: 'Xem them keo',
      createMatch: 'Tao keo giao luu cua ban',
    },
    cta: {
      title: 'Khong co keo phu hop?',
      subtitle: 'Tu tao keo theo cach ban muon',
    },
  },
  homeReview: {
    niceClub: 'CLB rat nice',
    strongTempo: 'Nhip danh nhanh va deu',
    friendlyPlayers: 'Nguoi choi than thien',
    fastPace: 'Toc do cao, hop danh nang',
  },
} as const;
