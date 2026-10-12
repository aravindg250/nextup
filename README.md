# NextUp

A personal daily to-do app for iPhone and Windows: color-coded sections per day, a Completed area, a month calendar with done/total counts, carry-over tasks with reminders, and your Canvas due dates. One Expo (React Native) codebase; the iPhone app is sideloaded with a free Apple ID.

Design spec: https://claude.ai/code/artifact/4f3944f8-1d65-4e2a-8941-d923dd63c37e

## Project layout

| Path | What's there |
| --- | --- |
| `src/app/` | Screens (Expo Router; every file is a route) |
| `src/components/` | UI pieces: day header, section block, task row |
| `src/lib/` | Date helpers and hooks |
| `src/theme/` | Midnight Brass colors (light and dark), section colors, fonts |
| `assets/fonts/` | Bodoni Moda italic, cut for the big date and for section names |
| `.github/workflows/ios-build.yml` | Cloud Mac build that produces `NextUp.ipa` |

## Run it on your laptop and phone (development)

You need [Node.js LTS](https://nodejs.org) and [Git](https://git-scm.com/download/win).

```powershell
npm install
npm start
```

- Press `w` to open it in your browser.
- On your iPhone, install **Expo Go** from the App Store, then scan the QR code with the Camera app.
- On campus Wi-Fi the phone often can't reach your laptop. Use `npm run start:tunnel` instead.

Saving a file reloads the app on both instantly.

## Install the real app on your iPhone

1. Push this repo to GitHub.
2. In the repo, open **Actions > iOS build > Run workflow**. It takes about 15-25 minutes.
3. When it finishes, download the **NextUp-ipa** artifact and unzip it to get `NextUp.ipa`.
4. Install it with AltStore (one-time AltStore setup is below), using **My Apps > +** in AltStore on your iPhone.

The app keeps working for 7 days per signing. AltStore re-signs it automatically when your phone and laptop are on the same Wi-Fi and AltServer is running, or tap **Refresh All** in AltStore.

### One-time AltStore setup (Windows)

Follow [AltStore's Windows guide](https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows). In short:

1. Install iTunes and iCloud from Apple's website, not the Microsoft Store.
2. Install AltServer, then run it as administrator.
3. Plug in your iPhone, open iTunes, and turn on Wi-Fi sync for it.
4. Click the AltServer icon in the taskbar, choose **Install AltStore**, pick your iPhone, and sign in with your Apple ID.
5. On the iPhone: **Settings > General > VPN & Device Management**, trust your Apple ID.
6. **Settings > Privacy & Security > Developer Mode**, turn it on and restart.

## Checks

```powershell
npm run typecheck
npm run lint
```
