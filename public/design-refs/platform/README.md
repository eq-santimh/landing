# Equitty Platform Design Reference Screenshots

This directory contains visual screenshots and design audit of the Equitty real estate tokenization platform for the purpose of redesigning the landing page to match the platform's aesthetic.

## Captured URLs

All screenshots were captured at desktop width (~1200-1280px) on August 18, 2026.

### 1. Root URL
**URL:** `https://equitty-app-frontend-production.up.railway.app/`  
**Result:** Redirects to marketplace

### 2. Dashboard
**URL:** `https://equitty-app-frontend-production.up.railway.app/dashboard`  
**Result:** Redirects to login page (authentication required)

### 3. Marketplace
**URL:** `https://equitty-app-frontend-production.up.railway.app/marketplace`  
**Result:** Main marketplace with property listings (same as root)

### 4. Login
**URL:** `https://equitty-app-frontend-production.up.railway.app/login`  
**Result:** Login page with split-screen design

### 5. Register
Accessed via "Registrate ahora" link from login page  
**Result:** Registration form with same split-screen design

## Screenshot Files

1. **01-marketplace-home.webp** (65KB)
   - Full marketplace homepage view
   - Shows header, filters, property cards in grid layout
   - Captures: Logo, nav buttons, category filters, 6 property cards

2. **02-marketplace-cards-detail.webp** (63KB)
   - Marketplace with property card hover state
   - Shows expanded property details on hover
   - Captures: Card interaction, additional property info overlay

3. **03-header-and-filters.webp** (65KB)
   - Close-up of header and filter section
   - Shows: EQUITTY logo, Marketplace title, category chips
   - Captures: Full header design, filter UI patterns

4. **04-login-page.webp** (30KB)
   - Login page with dramatic split-screen design
   - Left: Dark background with login form
   - Right: Bright cyan/blue with Ethereum coin graphic
   - Captures: Full authentication page aesthetic

5. **05-marketplace-full.webp** (63KB)
   - Complete marketplace view with all loaded property cards
   - Shows full 3-column grid layout
   - Captures: Complete property card variety

6. **06-property-cards-hover.webp** (59KB)
   - Multiple property cards showing hover interactions
   - Different property types (Hoteleria, Energia, Residencial)
   - Captures: Card hover states, tooltip details, button color changes

7. **07-footer-and-cards.webp** (58KB)
   - Bottom section showing footer
   - Footer text: "Equitty - Plataforma regulada bajo CNAD de El Salvador"
   - Additional: "Emisión privada - Máx. 50 inversionistas calificados"
   - Captures: Footer design, regulatory information display

8. **08-register-page.webp** (29KB)
   - Registration page "Crea tu cuenta"
   - Same split-screen design as login
   - Shows: Registration form fields, "Continuar con Google" option
   - Captures: Consistent auth page design pattern

## Visual Audit Document

**VISUAL-AUDIT.md** (13KB)
- Comprehensive design system analysis
- Color palette with exact values (extracted from DevTools)
- Typography specifications
- Component pattern documentation
- Layout structure analysis
- Comparison with "neon-dark crypto" aesthetics
- Design recommendations for landing page

## Key Design Elements Captured

### Header/Navigation
- Clean, minimal header design
- Logo (teal geometric triangle + "EQUITTY" text)
- Page title in center
- Auth buttons on right (Iniciar sesión + Registrarse)

### Category Filters
- Horizontal chip/tab navigation
- Categories: Todas, Hoteleria, Residencial, Comercial, Energia, Infraestructura
- Active state styling

### Property Cards
- Image header with category tag overlay
- Status badges (VENTA PRIVADA, Calificación requerida)
- Property details: TIR, Plazo, Liquidez
- Progress bars for construction and funding
- Financial metrics: TOKEN, RETORNO, SUPPLY
- "Invertir ahora" button
- Hover state with expanded details

### Split-Screen Auth Pages
- Dramatic 50/50 split design
- Left: Dark background (black/navy) with form
- Right: Bright cyan/blue gradient with Ethereum coin
- Consistent across login and register pages
- Creates visual impact for authentication flow

### Color Palette (Confirmed)
- **Primary Teal:** `rgb(0, 178, 194)` / `#00B2C2`
- **Dark Navy Button:** `rgb(23, 55, 67)` / `#173743`
- **Background:** Light gray/white
- **Text:** Dark gray/black for primary, medium gray for secondary

### Typography
- Modern sans-serif (likely Inter or similar)
- Clear hierarchy with bold headings
- Readable sizes (14-16px body, 32-36px titles)

### Component Styling
- Rounded corners (8-16px)
- Subtle shadows
- Clean, minimal aesthetic
- Professional fintech feel

## Usage Notes

These screenshots and the visual audit should be used to:

1. **Inform Landing Page Color Palette**
   - Use the teal `#00B2C2` as primary brand color
   - Maintain light, professional backgrounds
   - Use dark sections strategically (not everywhere)

2. **Match Component Styling**
   - Similar button styles (rounded, teal primary)
   - Card designs with subtle shadows
   - Clean typography hierarchy

3. **Maintain Professional Aesthetic**
   - Avoid overly "crypto" dark themes on main content
   - Focus on trust and professionalism
   - Use real estate imagery prominently

4. **Consider Split-Screen Pattern**
   - For hero sections or specific impact areas
   - Creates visual interest
   - Balances content and imagery

## Technical Notes

- All screenshots are in .webp format for optimal file size
- Captured at desktop resolution (~1200-1280px width)
- Platform is a React SPA (JavaScript-required)
- All property data loaded dynamically
- Platform uses Spanish language throughout

## Color Extraction Method

Colors were extracted using Chrome DevTools:
1. Opened DevTools (F12)
2. Used Element Inspector (Ctrl+Shift+C)
3. Selected primary button element
4. Viewed Computed styles tab
5. Found `background-color: rgb(0, 178, 194)`

Additional colors estimated visually from screenshots.

---

**Date Captured:** August 18, 2026  
**Browser:** Chrome on Linux  
**Purpose:** Landing page redesign reference
