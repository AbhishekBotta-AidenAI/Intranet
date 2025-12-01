# Component Quick Reference

## 🗂️ File Structure

```
src/
├── components/
│   ├── TopNavbar.tsx              # Top navigation with user profile
│   ├── LeftSidebar.tsx            # Sidebar menu navigation
│   ├── HeroBanner.tsx             # Hero section with banner
│   ├── TimeWidget.tsx             # Time display widget
│   ├── HolidayCalendar.tsx        # Holiday information
│   ├── QuickLinks.tsx             # Quick access links
│   ├── MoodTracker.tsx            # Mood selection widget
│   ├── OrganizationEngagement.tsx # Post/Poll creation
│   ├── RecommendedSection.tsx     # Content recommendations
│   ├── UpcomingApps.tsx           # App showcase
│   ├── ChatBot.tsx                # Floating chat button
│   └── Footer.tsx                 # Page footer
├── layouts/
│   └── MainLayout.tsx             # Main page layout
├── pages/
│   └── Dashboard.tsx              # Main dashboard page
├── App.tsx                        # Root component
├── main.tsx                       # React entry
└── index.css                      # Global styles
```

## 🎨 Component Import Reference

```typescript
// In Dashboard.tsx
import HeroBanner from '../components/HeroBanner';
import TimeWidget from '../components/TimeWidget';
import HolidayCalendar from '../components/HolidayCalendar';
import QuickLinks from '../components/QuickLinks';
import MoodTracker from '../components/MoodTracker';
import OrganizationEngagement from '../components/OrganizationEngagement';
import RecommendedSection from '../components/RecommendedSection';
import UpcomingApps from '../components/UpcomingApps';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

// In MainLayout.tsx
import LeftSidebar from '../components/LeftSidebar';
import TopNavbar from '../components/TopNavbar';

// In App.tsx
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
```

## 📊 Layout Hierarchy

```
App.tsx
└── MainLayout.tsx
    ├── TopNavbar.tsx
    ├── LeftSidebar.tsx
    └── Dashboard.tsx (children)
        ├── HeroBanner.tsx
        ├── TimeWidget.tsx
        ├── HolidayCalendar.tsx
        ├── QuickLinks.tsx
        ├── MoodTracker.tsx
        ├── OrganizationEngagement.tsx
        ├── UpcomingApps.tsx
        ├── RecommendedSection.tsx
        ├── ChatBot.tsx
        └── Footer.tsx
```

## 🎯 Component Props

### Most components are self-contained with no props

```typescript
// All these components have no props - they're standalone
<TopNavbar />
<LeftSidebar />
<HeroBanner />
<TimeWidget />
<HolidayCalendar />
<QuickLinks />
<MoodTracker />
<OrganizationEngagement />
<RecommendedSection />
<UpcomingApps />
<ChatBot />
<Footer />
```

### MainLayout
```typescript
interface MainLayoutProps {
    children: React.ReactNode;
}
```

## 🔄 State Management

Currently using local state with `useState`:

- **LeftSidebar**: `isOpen` for mobile menu toggle
- **TimeWidget**: Uses JavaScript `Date()` for current time
- **MoodTracker**: Could add state for selected mood
- **OrganizationEngagement**: Could add state for post content

## 🎨 Styling Patterns

### Common Tailwind Classes Used

```typescript
// Cards
"bg-white border border-neutral-200 rounded-xl p-6"

// Primary Buttons
"bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light"

// Secondary Buttons
"bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"

// Grid Layouts
"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"

// Flex Containers
"flex items-center justify-between gap-4"

// Text Styles
"text-sm font-semibold text-neutral-900"
```

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📱 Responsive Classes Reference

```typescript
// Mobile first approach
"block"                    // All screens
"md:flex"                  // Medium screens and up
"lg:grid-cols-2"          // Large screens and up
"xl:col-span-3"           // Extra large screens and up

// Hide on mobile
"hidden md:block"

// Show only on mobile
"block md:hidden"
```

## 🎨 Color Classes Reference

```typescript
// Primary brand colors
"bg-primary"              // #0A3D62
"text-primary"
"border-primary"
"hover:bg-primary-light"

// Neutral grays
"bg-neutral-50"           // Lightest
"bg-neutral-100"
"text-neutral-600"        // Text
"border-neutral-200"      // Borders

// Accents
"bg-green-500"            // Success
"bg-blue-500"             // Info
"bg-red-500"              // Error
```

## 🔧 Common Icon Usage (Lucide React)

```typescript
import { 
  Home, User, FileText, Users, DollarSign,
  MessageSquare, Search, Bell, LogOut, Clock,
  Calendar, ChevronLeft, ChevronRight, Plus,
  MessageCircle, Briefcase, GraduationCap
} from 'lucide-react';

// Usage
<Home size={20} className="text-neutral-600" />
<Bell size={20} className="text-neutral-600" />
```

## 📝 Adding New Components

1. Create file in `src/components/YourComponent.tsx`
2. Import required icons from `lucide-react`
3. Use TypeScript interfaces for props if needed
4. Apply Tailwind classes following the design system
5. Import in `Dashboard.tsx` or parent component
6. Add to layout

## 🎯 Design System Quick Access

### Spacing
- `gap-3` = 12px
- `gap-4` = 16px
- `gap-6` = 24px
- `p-4` = 16px padding
- `p-6` = 24px padding

### Border Radius
- `rounded-lg` = 8px
- `rounded-xl` = 12px
- `rounded-2xl` = 16px

### Shadows
- `shadow-sm` = Small shadow
- `shadow-md` = Medium shadow
- `shadow-lg` = Large shadow

### Transitions
- `transition-colors` = Color transitions
- `transition-all` = All properties
- `duration-200` = 200ms duration
- `duration-300` = 300ms duration
