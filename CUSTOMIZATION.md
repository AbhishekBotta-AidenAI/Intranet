# 🎨 Customization Guide

## Quick Customization Reference

### 🎨 Change Brand Colors

**File**: `tailwind.config.js`

\`\`\`javascript
colors: {
    primary: {
        DEFAULT: '#0A3D62',  // Change to your brand color
        dark: '#082E4A',     // Darker shade
        light: '#0E5280',    // Lighter shade
    },
}
\`\`\`

**What changes:**
- Navigation bars
- Active menu items
- Buttons
- Footer
- Chat bot
- Links

---

### 📝 Change Font

**File**: `tailwind.config.js`

\`\`\`javascript
fontFamily: {
    sans: ['YourFont', 'system-ui', 'sans-serif'],
}
\`\`\`

**File**: `src/index.css`

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap');
\`\`\`

---

### 🖼️ Replace Images

#### Logo
**Files to update:**
- `TopNavbar.tsx` - Line 8-11
- `LeftSidebar.tsx` - Line 42-45
- `Footer.tsx` - Line 5-8

\`\`\`tsx
// Replace this:
<div className="w-8 h-8 bg-primary rounded-full">
    <span className="text-white">AN</span>
</div>

// With:
<img src="/logo.png" alt="Company Logo" className="w-8 h-8" />
\`\`\`

#### Hero Banner Background
**File**: `HeroBanner.tsx` - Line 8

\`\`\`tsx
<img 
    src="/images/hero-banner.jpg"  // Your image path
    alt="Hero Banner" 
    className="w-full h-full object-cover opacity-40"
/>
\`\`\`

#### User Avatar
**File**: `TopNavbar.tsx` - Line 41

\`\`\`tsx
<img 
    src="/images/user-avatar.jpg"  // Your image path
    alt="User Avatar" 
    className="w-full h-full object-cover"
/>
\`\`\`

---

### 👤 Change User Information

**File**: `TopNavbar.tsx` - Line 34-36

\`\`\`tsx
<div className="text-right hidden sm:block">
    <p className="text-sm font-semibold text-neutral-900">Your Name</p>
    <p className="text-xs text-neutral-500">Your Title</p>
    <p className="text-xs text-neutral-400">Your Department</p>
</div>
\`\`\`

**File**: `Dashboard.tsx` - Line 18-19

\`\`\`tsx
<h2 className="text-2xl font-bold text-neutral-900 mb-1">
    Hey <span className="text-primary">YourName</span>,
</h2>
\`\`\`

---

### 📱 Change Quick Links

**File**: `QuickLinks.tsx` - Line 3-7

\`\`\`tsx
const links = [
    { label: 'Your Link 1', sublabel: 'Label', bgColor: 'bg-primary' },
    { label: 'Your Link 2', sublabel: 'Label', bgColor: 'bg-blue-500' },
    { label: 'Your Link 3', sublabel: 'Label', bgColor: 'bg-green-500' },
];
\`\`\`

---

### 🎯 Change Sidebar Menu Items

**File**: `LeftSidebar.tsx` - Line 12-19

\`\`\`tsx
const menuItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <FileText size={20} />, label: 'Documents' },
    { icon: <Users size={20} />, label: 'Team' },
    // Add more menu items here
];
\`\`\`

---

### 📰 Change Hero Banner Content

**File**: `HeroBanner.tsx` - Line 18-26

\`\`\`tsx
<div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
    YOUR BADGE TEXT
</div>
<h2 className="text-3xl font-bold text-white mb-2">
    Your Headline Here
</h2>
<p className="text-neutral-100 text-sm">
    Your subtitle or description
</p>
<button className="mt-4 bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-100 transition-colors">
    YOUR BUTTON TEXT
</button>
\`\`\`

---

### 🎄 Change Holiday Information

**File**: `HolidayCalendar.tsx` - Line 18-19

\`\`\`tsx
<h3 className="text-2xl font-bold mb-2">Your Holiday</h3>
<p className="text-red-200 text-sm mb-4">Month Day, Year</p>
\`\`\`

---

### 📱 Change Upcoming Apps

**File**: `UpcomingApps.tsx` - Line 4-10

\`\`\`tsx
const apps = [
    { icon: <YourIcon />, label: 'App 1', color: 'bg-orange-500' },
    { icon: <YourIcon />, label: 'App 2', color: 'bg-green-500' },
    { icon: <YourIcon />, label: 'App 3', color: 'bg-blue-500' },
    // Add more apps
];
\`\`\`

**Available Colors:**
- \`bg-primary\` - Dark blue
- \`bg-red-500\` - Red
- \`bg-orange-500\` - Orange
- \`bg-yellow-500\` - Yellow
- \`bg-green-500\` - Green
- \`bg-blue-500\` - Blue
- \`bg-purple-500\` - Purple
- \`bg-pink-500\` - Pink

---

### 📝 Change Footer Text

**File**: `Footer.tsx` - Line 18-20

\`\`\`tsx
<button className="hover:text-neutral-200 transition-colors">
    Your Link Text
</button>
<span className="text-neutral-200">
    © 2025 YourCompany. All rights reserved.
</span>
\`\`\`

---

### 💬 Change Chat Bot Icon

**File**: `ChatBot.tsx` - Line 7

\`\`\`tsx
// Import different icon from lucide-react
import { HelpCircle } from 'lucide-react';

// Use it
<HelpCircle size={24} className="text-white" />
\`\`\`

---

### 📊 Add Real Data

#### Connect to API

**Example: Fetch recommendations**

\`\`\`tsx
import { useState, useEffect } from 'react';

const RecommendedSection = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch('/api/recommendations')
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, []);

    return (
        // Your component JSX
    );
};
\`\`\`

---

### 🎭 Add Loading States

\`\`\`tsx
const [isLoading, setIsLoading] = useState(true);

// In render
{isLoading ? (
    <div className="animate-pulse bg-neutral-200 h-20 rounded-lg"></div>
) : (
    // Your actual content
)}
\`\`\`

---

### 🔔 Add Real Notifications

**File**: `TopNavbar.tsx` - Line 22-25

\`\`\`tsx
<button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative">
    <Bell size={20} className="text-neutral-600" />
    {notificationCount > 0 && (
        <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {notificationCount}
        </span>
    )}
</button>
\`\`\`

---

### 🎨 Change Widget Background Colors

#### Time Widget
**File**: `TimeWidget.tsx` - Line 6

\`\`\`tsx
<div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white">
\`\`\`

#### Holiday Calendar
**File**: `HolidayCalendar.tsx` - Line 4

\`\`\`tsx
<div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 text-white">
\`\`\`

---

### 📐 Adjust Spacing

**Common spacing values:**
- \`gap-2\` = 8px
- \`gap-3\` = 12px
- \`gap-4\` = 16px
- \`gap-6\` = 24px
- \`gap-8\` = 32px

**Padding:**
- \`p-2\` = 8px
- \`p-4\` = 16px
- \`p-6\` = 24px
- \`p-8\` = 32px

**Margin:**
- \`mb-2\` = 8px bottom
- \`mb-4\` = 16px bottom
- \`mb-6\` = 24px bottom

---

### 🎯 Make Components Clickable

\`\`\`tsx
// Wrap in a button or link
<button onClick={() => handleClick()} className="...">
    {/* Your content */}
</button>

// Or use a link
<a href="/page" className="...">
    {/* Your content */}
</a>
\`\`\`

---

### 🔧 Add New Component

1. Create file: \`src/components/YourComponent.tsx\`

\`\`\`tsx
const YourComponent = () => {
    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                Your Title
            </h3>
            {/* Your content */}
        </div>
    );
};

export default YourComponent;
\`\`\`

2. Import in \`Dashboard.tsx\`

\`\`\`tsx
import YourComponent from '../components/YourComponent';
\`\`\`

3. Add to layout

\`\`\`tsx
<YourComponent />
\`\`\`

---

### 🎨 Pre-built Color Schemes

#### Option 1: Purple Theme
\`\`\`javascript
primary: {
    DEFAULT: '#7C3AED',
    dark: '#6D28D9',
    light: '#8B5CF6',
}
\`\`\`

#### Option 2: Green Theme
\`\`\`javascript
primary: {
    DEFAULT: '#059669',
    dark: '#047857',
    light: '#10B981',
}
\`\`\`

#### Option 3: Orange Theme
\`\`\`javascript
primary: {
    DEFAULT: '#EA580C',
    dark: '#C2410C',
    light: '#F97316',
}
\`\`\`

---

### 🚀 Performance Tips

1. **Lazy load images:**
\`\`\`tsx
<img loading="lazy" src="..." alt="..." />
\`\`\`

2. **Add image optimization:**
\`\`\`tsx
<img 
    src="/images/optimized-image.webp" 
    srcSet="/images/small.webp 400w, /images/large.webp 800w"
    sizes="(max-width: 768px) 400px, 800px"
    alt="..."
/>
\`\`\`

3. **Use CSS containment:**
\`\`\`tsx
<div style={{ contain: 'layout' }}>
\`\`\`

---

### 📱 Mobile Optimization

**Hide on mobile:**
\`\`\`tsx
<div className="hidden md:block">
    {/* Content only visible on tablet+ */}
</div>
\`\`\`

**Show only on mobile:**
\`\`\`tsx
<div className="block md:hidden">
    {/* Content only visible on mobile */}
</div>
\`\`\`

**Different layouts:**
\`\`\`tsx
<div className="flex-col md:flex-row">
    {/* Vertical on mobile, horizontal on desktop */}
</div>
\`\`\`

---

## 🎯 Quick Wins

### Make it Your Own in 5 Minutes:

1. ✅ Change primary color in \`tailwind.config.js\`
2. ✅ Update company name in \`TopNavbar.tsx\`
3. ✅ Change user name in \`Dashboard.tsx\`
4. ✅ Update hero banner text in \`HeroBanner.tsx\`
5. ✅ Replace footer text in \`Footer.tsx\`

**Done! Your portal is personalized!** 🎉

---

Need more help? Check out:
- \`IMPLEMENTATION.md\` - Full implementation details
- \`COMPONENT_GUIDE.md\` - Component reference
- \`LAYOUT_MAP.md\` - Visual layout guide
