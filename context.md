# Smasholic – Product & Tech Context

## 1. Product Vision

Smasholic is a mobile app that connects badminton players with clubs and nearby games.
The core value is enabling **casual (walk-in) players** to quickly find games, see available slots,
request to join, and get real-time confirmation from clubs.

The product focuses on **match-making and booking**, not just court reservation.

Primary goals:
- Fast discovery of nearby games
- Clear slot availability
- Simple booking with real-time feedback
- Friendly community experience

---

## 2. Core User Roles

- Player (walk-in / casual): searches and joins games
- Club Owner / Admin: manages games, confirms bookings
- Club Member: fixed participants (not priority for MVP)

---

## 3. Core Business Flow (Priority)

### Flow #1 – Walk-in Booking (Primary Flow)

1. User opens app and sees nearby available games
2. User selects a game and taps “Join / Book”
3. Backend checks remaining slots
4. Booking is created with status **PENDING**
5. Slot is temporarily reserved
6. Club owner receives notification
7. Club owner **APPROVES or REJECTS**
8. User receives real-time confirmation

Booking states:
- PENDING
- APPROVED
- REJECTED

Slot handling:
- slots_reserved (pending)
- slots_confirmed (approved)
- No overbooking allowed (must use DB transaction)

This flow is the backbone of the entire system.

---

## 4. Secondary Flows (Later Phases)

- Nearby game discovery with filters (date, distance, skill, gender)
- Fixed club schedules generating game occurrences
- Auto-post recruitment if fixed session lacks players
- Rating & review after playing

These are not MVP blockers but should be supported by the schema design.

---

## 5. Core Domain Entities

- User
- Club
- Game / Post (time, location, slots, pricing, requirements)
- Booking (user ↔ game)
- Notification
- Rating (post-play)

Key relationships:
- A Game has many Bookings
- A Booking belongs to one User and one Game
- A Club owns many Games

---

## 6. UX Principles

- Home screen = discovery radar, not dashboard
- Location-first experience
- Quick filter chips instead of heavy search
- Slot availability must be visually prominent
- Single primary action: “Join / Book”
- Real-time UI updates (no manual refresh)

---

## 7. Tech Stack (High Level)

### Frontend
- React Native + TypeScript
- Mobile-first UX
- Realtime updates via subscriptions or sockets

### Backend
- NestJS + TypeScript
- GraphQL (preferred) or REST
- Clear separation:
  - Domain logic
  - Application use cases
  - Infrastructure adapters

### Database
- PostgreSQL
- Strong transactional guarantees
- Optional PostGIS for geo queries

### Auth
- Firebase Authentication (Google login)
- Backend verifies Firebase ID token

### Realtime & Notifications
- GraphQL Subscriptions or WebSockets
- Push notifications via FCM

### Cloud (Deployment Target)
- AWS
  - AppSync or API Gateway + Lambda
  - Aurora PostgreSQL
  - S3 + CloudFront (media)
  - EventBridge (scheduled jobs)

Development is **local-first**; cloud is deployment-only.

---

## 8. Engineering Principles

- Business logic must be framework-agnostic
- No AWS-specific code in domain layer
- Booking logic must be concurrency-safe
- Prefer clarity over abstraction
- MVP first, extensibility second

---

## 9. Naming & Conventions

- Entities: User, Club, Game/Post, Booking, Notification
- States: PENDING, APPROVED, REJECTED, CONFIRMED, CLOSED
- camelCase for fields and variables
- TypeScript everywhere

---

## 10. Summary (for AI Context)

Smasholic is a badminton match-making app focused on walk-in booking.
The primary flow is booking a slot, reserving capacity, and confirming via club approval.
The system prioritizes real-time UX, transactional safety, and clean domain separation.
