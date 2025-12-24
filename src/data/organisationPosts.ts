export interface OrgPost {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  CreatedOn?: string;
  timeAgo: string;
  text: string;
  image?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

const posts: OrgPost[] = [
  {
    id: 'post-1',
    author: 'Nandini Sharma',
    role: 'UI/UX Designer',
    avatar: '/Dashboard/UserPic.png',
    CreatedOn:'2024-06-10T10:00:00Z',
    timeAgo: '2h ago',
    text: "Excited to share a new UX guide with everyone! Here's a short summary and the key takeaways.",
    image: '',
    likes: 12,
    comments: 4,
    shares: 1
  },
  {
    id: 'post-2',
    author: 'Amit Verma',
    role: 'Developer',
    avatar: '/Dashboard/UserPic.png',
    CreatedOn:'2024-06-10T10:00:00Z',
    timeAgo: '1 day ago',
    text: "Here's a quick update on the new sprint cycle — planning done, ready to start development.",
    likes: 8,
    comments: 2,
    shares: 0
  },
  {
    id: 'post-3',
    author: 'Ravi Patel',
    role: 'Product Manager',
    avatar: '/Dashboard/UserPic.png',
    CreatedOn:'2024-06-10T10:00:00Z',
    timeAgo: '3 days ago',
    text: "Reminder: All-hands meeting scheduled for next Monday at 10 AM. Please add agenda items.",
    likes: 5,
    comments: 3,
    shares: 0
  }
];

export default posts;
