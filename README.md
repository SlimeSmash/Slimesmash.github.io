<div align="center">

# 🟢 SlimeSmash

**A fast-paced arcade mobile game — smash slimes, collect companions, climb the leaderboards.**

[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://play.google.com/store/apps/details?id=com.SlimeSmashStudio.SlimeSmash)
[![Engine](https://img.shields.io/badge/Engine-Unity-000000?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com)
[![Language](https://img.shields.io/badge/Language-C%23-512BD4?style=for-the-badge&logo=csharp&logoColor=white)](https://learn.microsoft.com/en-us/dotnet/csharp/)
[![Firebase](https://img.shields.io/badge/Analytics-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

[ Download on Google Play](https://play.google.com/store/apps/details?id=com.SlimeSmashStudio.SlimeSmash) · [ Website](https://slimesmash.github.io/) · [ Changelog](https://slimesmash.github.io/changelog)

</div>

---

##  Overview

**SlimeSmash** is a solo indie project built entirely in Unity and C#. It's a mobile arcade game centered around satisfying slime-smashing gameplay, a rewarding progression loop, and full live-ops infrastructure — all designed, developed, and shipped by one developer.

The project pushed into real production challenges: cross-device cloud saves, offline sync, crash monitoring, remote configuration, and live analytics — not just a prototype, but a game running in the wild.

## Status
Actively maintained — live on Google Play with ongoing updates
##  Features

| Feature | Description |
|---|---|
| **Pets & Companions** | Unlock unique pets that actively alter gameplay dynamics |
| **Adventure Mode** | 50+ handcrafted levels with escalating mechanics |
| **Endless Mode** | Score-chase survival with global ranking |
| **Retro Aesthetic** | Pixel-art visuals paired with a chiptune soundtrack |
| **Global Leaderboards** | Live worldwide ranking via Unity Leaderboards |
| **Daily Rewards** | Streak-based reward system to drive retention |
| **Upgrades System** | Ability enhancements tied to in-game progression |

---

## Tech Stack

### Engine & Language
- **Unity** + **C#**

### Backend & Live Services
- **Unity Cloud Save** — cross-device persistence with conflict resolution
- **Unity Leaderboards** — real-time global rankings
- **Unity Authentication** — anonymous and persistent player identity
- **Unity Remote Config** — server-driven game tuning without patches

### Analytics & Monitoring
- **Firebase Analytics** — player behavior and engagement tracking
- **Firebase Crashlytics** — production crash reporting and diagnostics
- **Firebase Cloud Messaging** — targeted push notifications

### Monetization
- **Google AdMob** — ad integration

---

## Live Operations

SlimeSmash runs real live-ops infrastructure, not mocked services:

- **Cloud Save with Conflict Resolution** — intelligent merge logic handles simultaneous writes across devices
- **Offline-to-Online Sync** — queued operations with automatic retry ensure no progress is lost during connectivity drops
- **Remote Config** — game parameters adjustable server-side without a store update
- **Behavioral Analytics** — used to identify drop-off points and improve retention loops
- **Push Notifications** — re-engagement alerts tied to daily reward windows

---

## Roadmap

- [ ] **1v1 Multiplayer** — real-time competitive mode using Unity Netcode with trophy-based matchmaking

---

## Repository Structure

```
slimesmash.github.io/
├── index.html        # Landing page — technical and legal documentation
├── changelog.html    # Version history
└── app-ads.txt       # Google AdMob publisher verification
```

---

## Key Takeaways

Building and shipping SlimeSmash as a solo project provided hands-on experience with:

- **Progression design** — architecting balanced systems that feel rewarding without being exploitative
- **Mobile sync complexity** — managing online/offline state transitions gracefully on real devices
- **Live-ops integration** — wiring multiple backend services (Unity, Firebase, AdMob) into a coherent, maintainable architecture
- **Production debugging** — diagnosing real-world crashes and shipping targeted hotfixes through the Google Play Store pipeline

---

## Contact

Bug reports, feedback, or questions are welcome:

 [SlimeSmash.Dev@gmail.com](mailto:SlimeSmash.Dev@gmail.com)

---

## License

This repository is for portfolio and documentation purposes. Source code is not publicly available.
