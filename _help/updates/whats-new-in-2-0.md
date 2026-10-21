---
title: "What's new in 2.0"
category: "updates"
order: 1
updated: "2026-10-21"
popular: true
summary: "SlimeSmash 2.0: 360° Defense Mode, five languages, new backgrounds, a rebuilt save system and what was removed."
keywords: ["2.0", "defense", "release notes", "languages", "removed", "companions", "devourer", "music", "update"]
---
SlimeSmash 2.0 is the biggest update so far: a new main game mode, new backgrounds, five languages and a much safer save system. The short version is below. The full list with every tag is on the [changelog](/changelog.html).

## Highlights

- **[Defense Mode](/help/modes/defense-mode/)** is now the main way to play. Slimes come from every side and you protect your base.
- **New backgrounds:** an animated main menu, new Adventure backgrounds, and Defense backgrounds that change every 5 waves.
- **Five languages:** English, Español, Français, Deutsch and Português (Brasil). See [Languages](/help/guides/languages/).
- **A smoother first few minutes:** a rebuilt tutorial, a new loading screen and a new main menu.
- **Safer progress:** a rebuilt save system with cloud-sync protection, plus Firebase App Check and Play Integrity. See [Progress and saving](/help/guides/progress-and-saving/).
- **[Remove Ads](/help/guides/remove-ads/)** is one tap away from the main menu.

## New

**Gameplay**

- [Defense Mode](/help/modes/defense-mode/): slimes spawn from every direction, the base has a 2-hit shield, there is a progress bar, emergency boosts and an intro, and the background changes every 5 waves.
- More colourful Defense backgrounds, new Adventure backgrounds, and a redesigned level-select screen and level boxes.
- **Pet beams:** a line is drawn from a pet to each slime its ability affects.
- **Vibration** (haptic) feedback, with a Vibration toggle in [Settings](/help/guides/settings/).
- **[Surf Mode](/help/modes/surf-mode/)** is redesigned. Slimes move like a real wave, with rotation, and speed up as time runs out.
- **New slime movement:** slimes enter from the far right and travel left with a wave motion, a random speed (±20%) and rotation. Good slimes that escape reset your combo and cost 1.5 seconds.
- Pets in endless modes (Casual and Defense) no longer have a **max uses per game** limit. Cooldowns scale instead. See [Pets in endless modes](/help/reference/pets-in-endless-modes/).
- The Casual Mode lock screen shows a progress bar with a percentage.

**Economy and missions**

- [Daily Missions](/help/guides/daily-rewards-and-missions/) have a new panel, a **2x Coins** rewarded-ad button and a **+500 coin chest** for completing all missions.
- Interstitial ads appear at natural breaks in Adventure, Casual and Defense, and there are more rewarded options. See [Ads and privacy](/help/guides/ads-and-privacy/).
- The **Daily Reward** button moved to the main menu.
- **[Remove Ads](/help/guides/remove-ads/):** a new main-menu button opens the Remove Ads purchase, which removes interstitial ads.

**Interface**

- A new loading screen with a progress bar and live status, such as "Checking cloud save…".
- A new main-menu background, an improved in-game HUD, and toast messages that stay out of the way of play.
- **Player ID** is shown in [Settings](/help/guides/settings/).
- An improved Google Play sign-in panel.
- A "Coming Soon!" message on the Skins tab. The tab is not active yet.

**Languages**

- Menus, the tutorial, toasts, loading-screen messages, errors and Google sign-in messages are translated into all five languages.
- The pixel font now draws accented letters and punctuation, so nothing shows as boxes.
- [Player names](/help/guides/player-name-and-profile/) can include accented letters, such as José, François and Müller.

**Privacy and security**

- Firebase App Check with Play Integrity.
- Unneeded notification permissions were removed.
- A Google Analytics user ID was added and is described in the [Privacy Policy](/privacy.html).
- Your consent choice now also controls Firebase Analytics and Crashlytics, and **Privacy options** are available in Settings.

## Changes

- **First-time experience:** a 2-second wait on first open, no slimes spawn during the tutorial, the PC hint is skipped in the tutorial, and the Level 1 welcome panel no longer reappears when you replay it.
- **Records and checkpoints sync.** Wave and Defense records and the Defense checkpoint now sync with your cloud save. They used to be device-only.
- **Frame rate** defaults to 60 FPS for better battery life. A High FPS option is in Settings.
- Google Play Games identity changes no longer create duplicate identities or reuse another profile's data.
- Slimes no longer decay in Defense Mode.
- Mission rewards were rebalanced with more depth.

## Removed

- The **companion system**, including [Maximus](/help/pets/maximus/). [Pets](/help/pets/companions-and-pets/) stay.
- **Pet upgrades.** Pets will keep improving in small patches.
- The **stars system**, the **border system** and the **[Devourer](/help/slimes/devourer/)**.
- **Music.** The game has sound effects only, and the Music toggle is gone.
- The **daily missions streak.** The daily reward streak stays.
- The main-menu **splash text**.
- Slimes that only did something trivial or negative, such as taking away 1 score.

## Fixes

**Gameplay**

- [Zap](/help/pets/zap/) and [Bones](/help/pets/bones/) now work correctly, and the Mega Combo slime was verified.
- The Shield ability now protects the base, Vacuum no longer softlocks Defense waves, and pet abilities count kills toward wave completion.
- Saved slimes no longer stay red or instantly trigger the miss timer, and ghost slimes no longer jump back to full opacity.
- Visual effects appeared in the wrong position, and slime wobble no longer overwrites movement such as Magnetism or Split.
- Split, Explosion, Chain Reaction and Detonate Chain no longer error when objects are missing.
- Mirror Pop could be cancelled by an old timer, and Swap used twice could convert slimes permanently. Both are fixed.
- The tutorial can no longer freeze. It skips the pet-ability step when no ability pet can be used.
- Money slimes no longer pay double.
- **Defense records:** "NEW RECORD!" and the record bonus were paid on almost every run, and your high wave could be overwritten by a lower one. Records now only ever go up.
- The game now **pauses automatically** when you switch apps or get a call.
- The end-of-level panel shows coins, and several texts were corrected ("Kill X slimes", the wave-unlocked notification, slime description typos).

**Ads, missions and economy**

- The Mission 2x Coins rewarded ad never loaded. Fixed.
- If remote config could not be fetched, the game could show test ads. It now falls back to production ads.
- Daily missions refresh if the app stayed open past UTC midnight, and the reset countdown is correct in every time zone.
- The daily reward no longer locks for days if the phone clock was changed forward and back.
- Your best offline leaderboard score is kept. A worse run no longer replaces it.
- The review prompt could stop working after one failed request. Fixed.
- The Store Skins tab no longer does nothing when tapped.
- The update popup opens the Play Store reliably, even without the Play Store app.

**Performance**

- Smoother on low-end phones: missions save at most every 3 seconds instead of on every kill, and pop sounds use a small pool.
- **Sound OFF now silences pop sounds.** They ignored the setting before.
- A non-fatal crash found through crash reports was fixed.

**Accounts and saves**

- **Existing 1.x saves and Waves/Defense records are migrated automatically** on update.
- Signing in with Google after launching offline now works.
- A cloud download that fails is no longer treated as "no cloud save". Nothing is uploaded over your cloud save until it has been read successfully, and failed reads are retried.
- Save validation was reworked. Saves that cannot be verified are kept for recovery instead of deleted.
- **Delete account:** the cloud save and account are deleted first, and local data is wiped only after that succeeds. If it fails, or you are offline, nothing is lost and you can retry. See [Delete your account](/help/guides/delete-account/).
- A push-notification token is no longer written to device logs.
## Related pages

- [Defense Mode](/help/modes/defense-mode/) and its [wave table](/help/reference/defense-wave-table/)
- [Pets](/help/pets/companions-and-pets/)
- [Version history](/help/updates/version-history/)
