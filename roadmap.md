# Production Roadmap

## Code Refactoring
- [x] **Split the Code**
    - [x] Break ~1,100 line file into modular components
    - [x] Move `chairData` to `src/data/chairs.js`
    - [x] Extract components: `<ChairCard />`, `<Hero />`, `<ChairQuiz />`, etc.

## Features & Persistence
- [ ] **Persist the Wishlist**
    - Add `localStorage` to save favorite chairs between refreshes
- [ ] **Routing**
    - Replace conditional rendering with `react-router-dom`
    - Enable deep-linking (e.g., shareable `/chair/45` links)

## Design & Assets
- [ ] **Real Images**
    - Replace emojis with Midjourney-generated photorealistic images
    - Establish a consistent "studio shot" style
    - Process and squash images for web performance

## Creative Expansion (Fun & Growth)
- [ ] **"The Chairman" Chatbot**
    -   AI Persona: Sentient chair that judges standing users
    -   Tech: Vercel AI SDK
- [ ] **Interactive "Chair Lab"**
    -   Procedural generation: Combine legs/seats/backs
    -   Shareable unique links
- [ ] **Content Engine**
    -   "The Daily Sit" Newsletter signup
    -   "Rate My Sit" AI photo analyzer app
- [ ] **Monetization**
    -   "Lazy" affiliate links ("I need this for my butt")
    -   "Verified Sitter" badge
