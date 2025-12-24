# Aiden Nexus Intranet Portal - Implementation Guide

## 🎨 Design Implementation

This project is a pixel-perfect implementation of the Figma design for the Aiden Nexus Intranet Portal, built with **React**, **TypeScript**, and **Tailwind CSS**.

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── TopNavbar.tsx          # Top navigation bar with user profile
│   │   ├── LeftSidebar.tsx        # Left sidebar navigation menu
│   │   ├── HeroBanner.tsx         # Hero banner with leadership message
│   │   ├── TimeWidget.tsx         # Time and date display widget
│   │   ├── HolidayCalendar.tsx    # Holiday calendar widget
│   │   ├── QuickLinks.tsx         # Quick access links (Payroll, Time & Attendance, etc.)
│   │   ├── MoodTracker.tsx        # Employee mood tracking widget
│   │   ├── OrganizationEngagement.tsx  # Post creation widget
│   │   ├── RecommendedSection.tsx # Recommended content sidebar
│   │   ├── UpcomingApps.tsx       # Upcoming apps showcase
│   │   ├── ChatBot.tsx            # Floating chat bot button
│   │   └── Footer.tsx             # Footer with branding
│   ├── layouts/
│   │   └── MainLayout.tsx         # Main layout wrapper
│   ├── pages/
│   │   └── Dashboard.tsx          # Main dashboard page
│   ├── App.tsx                    # App entry point
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles and Tailwind imports
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind configuration
└── package.json
```

## 🎯 Components Overview

### Navigation Components

#### TopNavbar
- **Location**: Top of the page
- **Features**:
  - Aiden Nexus branding logo
  - Navigation links (My Apps, Search, Help)
  - Notifications bell with indicator
  - User profile with avatar and details
  - Logout button
- **Responsive**: Mobile-friendly with collapsible menu

#### LeftSidebar
- **Location**: Left side of the page
- **Features**:
  - Navigation menu items (Home, Me, HR Policies, My Team, etc.)
  - Active state highlighting
  - Leadership badge indicator
  - Sticky positioning
- **Responsive**: Collapsible on mobile with overlay

### Dashboard Widgets

#### HeroBanner
- **Description**: Large promotional banner showcasing leadership messages
- **Features**:
  - Background image with gradient overlay
  - Badge for content category (FROM LEADERSHIP)
  - Call-to-action button
  - Navigation arrows for carousel functionality

#### TimeWidget
- **Description**: Displays current time and date
- **Features**:
  - Large time display (00:00 format)
  - Current date in readable format
  - Clock out status indicator
  - Dark gradient background

#### HolidayCalendar
- **Description**: Shows upcoming holidays
- **Features**:
  - Holiday name and date
  - Navigation arrows for browsing
  - View all button
  - Red-themed gradient background

#### QuickLinks
- **Description**: Quick access to important tools
- **Features**:
  - Payroll (ADP)
  - Time & Attendance (CLOCK)
  - Wellness (ESG-UOL)
- **Layout**: 3-column grid, responsive to 1 column on mobile

#### MoodTracker
- **Description**: Employee mood check-in widget
- **Features**:
  - 4 mood options with emojis
  - Active state highlighting
  - Interactive buttons
  - Labels: Not Great, Okay, Good, Awesome!

#### OrganizationEngagement
- **Description**: Social engagement widget for posts and polls
- **Features**:
  - Post creation textarea
  - Toggle between Post and Poll modes
  - Announcement button
  - Clean interface for content creation

#### RecommendedSection
- **Description**: Personalized content recommendations
- **Features**:
  - "For You" tab
  - Content cards with images
  - Title, description, and engagement stats
  - Gradient-themed thumbnails
  - Read all button

#### UpcomingApps
- **Description**: Showcase of upcoming applications
- **Features**:
  - Icon-based app cards
  - Aiden Tech, Aiden Bot, Aiden Learn, Timesheets, People
  - Hover effects
  - Color-coded icons

#### ChatBot
- **Description**: Floating chat assistant
- **Features**:
  - Fixed position at bottom-right
  - Message icon
  - Hover scale effect
  - Quick access to support

#### Footer
- **Description**: Page footer with branding
- **Features**:
  - Aiden Nexus logo
  - Copyright information
  - Terms & Conditions link
  - Dark blue background matching brand

## 🎨 Design System

### Color Palette

```javascript
// Primary Colors
primary: {
  DEFAULT: '#0A3D62',  // Main brand blue
  dark: '#082E4A',     // Darker shade
  light: '#0E5280',    // Lighter shade
}

// Accent Colors
accent: {
  green: '#00D9A3',    // Success/Active
  blue: '#3B82F6',     // Information
  red: '#DC2626',      // Error/Alert
}

// Neutral Colors
neutral: {
  50: '#F8FAFC',       // Lightest background
  100: '#F1F5F9',      // Light background
  200: '#E2E8F0',      // Borders
  300: '#CBD5E1',      // Subtle borders
  400: '#94A3B8',      // Placeholder text
  500: '#64748B',      // Secondary text
  600: '#475569',      // Primary text
  700: '#334155',      // Headings
  800: '#1E293B',      // Dark text
  900: '#0F172A',      // Darkest text
}
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing & Layout

- **Container Max Width**: 1280px (max-w-7xl)
- **Padding**: 24px (p-6) standard
- **Gap**: 24px (gap-6) for grid layouts
- **Border Radius**: 
  - Small: 8px (rounded-lg)
  - Medium: 12px (rounded-xl)
  - Large: 16px (rounded-2xl)

### Shadows

```javascript
'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
```

## 📱 Responsive Breakpoints

```javascript
sm: '640px',   // Small devices
md: '768px',   // Medium devices (tablets)
lg: '1024px',  // Large devices (desktops)
xl: '1280px',  // Extra large devices
```

### Responsive Behavior

- **Mobile (< 768px)**:
  - Sidebar collapses with hamburger menu
  - Single column layout for all widgets
  - Top navigation condensed
  - Footer simplified

- **Tablet (768px - 1024px)**:
  - Sidebar visible
  - 2-column grid for quick access widgets
  - Recommended section below main content

- **Desktop (> 1024px)**:
  - Full sidebar navigation
  - 3-column grid layout (2 main + 1 sidebar)
  - All widgets visible
  - Optimal spacing and padding

## 🚀 Running the Project

### Install Dependencies
```bash
cd Frontend
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Configuration Files

### tailwind.config.js
Custom Tailwind configuration with:
- Extended color palette
- Custom font family
- Custom shadows
- Responsive breakpoints

### vite.config.ts
Vite configuration for:
- React plugin
- Fast refresh
- Build optimization

### tsconfig.json
TypeScript configuration for:
- Strict type checking
- JSX support
- Module resolution

## 📦 Key Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "lucide-react": "^0.555.0",  // Icon library
  "tailwindcss": "^4.1.17",
  "typescript": "~5.9.3",
  "vite": "^7.2.4"
}
```

## ✨ Features Implemented

- ✅ Pixel-perfect design from Figma
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Tailwind CSS for styling
- ✅ Custom color palette matching design
- ✅ Inter font family integration
- ✅ Icon integration with Lucide React
- ✅ Hover states and transitions
- ✅ Accessible components
- ✅ Clean code structure
- ✅ Reusable components

## 🎯 Design Notes

### Figma Node References
All components are built to match the Figma design at node `7336:3296`.

### Image Placeholders
Currently using placeholder images. Replace with actual assets:
- Hero banner backgrounds
- User avatars
- Recommendation thumbnails
- App icons

### Future Enhancements
- [ ] Connect to backend API
- [ ] Add real-time data
- [ ] Implement authentication
- [ ] Add routing for different pages
- [ ] Integrate actual calendar data
- [ ] Connect holiday API
- [ ] Add post creation functionality
- [ ] Implement chat bot functionality

## 📝 Notes

- All components are semantic and accessible
- Code follows React best practices
- TypeScript ensures type safety
- Tailwind CSS provides consistent styling
- Mobile-first responsive design
- Performance optimized with Vite

## 🎨 Brand Guidelines

**Aiden Nexus Identity**:
- Logo: "AN" in white on primary blue circle
- Primary Color: Deep Blue (#0A3D62)
- Accent: Bright Green (#00D9A3)
- Typography: Clean, modern, professional
- Style: Corporate, friendly, innovative

---

**Built with ❤️ by the Aiden AI Team**
