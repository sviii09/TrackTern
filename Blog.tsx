// Blog.tsx
import React, { useEffect, useState } from 'react';
import './Blog.css';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  uniqueFeature: string;
  comments: string[];
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({}); // Individual input per post

  useEffect(() => {
    const fetchBlogPosts = () => {
      const posts: BlogPost[] = [
        {
          id: 1,
          title: "My First Internship at a Tech Startup",
          author: "Priya Sharma",
          content: "Working at a tech startup was a rollercoaster! I learned coding in Python and collaborated on a real project. The best part was the flexible hours.",
          date: "2025-04-10",
          uniqueFeature: "Skill Tracker: I used Internshala's skill assessment tools to monitor my progress in Python, earning a 90% score!",
          comments: [],
        },
        {
          id: 2,
          title: "Interning Abroad: Lessons from London",
          author: "Arjun Patel",
          content: "My internship in London with a marketing firm taught me global trends. The cultural exposure was unmatched, and I presented a campaign idea!",
          date: "2025-04-08",
          uniqueFeature: "Virtual Mentor: I connected with a mentor via Virtual Internships’ platform, who guided me through cross-cultural marketing strategies.",
          comments: [],
        },
        {
          id: 3,
          title: "Surviving a Finance Internship",
          author: "Sneha Gupta",
          content: "My finance internship at a bank was intense but rewarding. I analyzed stock data and presented findings to senior managers.",
          date: "2025-04-05",
          uniqueFeature: "Project Showcase: Extern’s platform let me showcase my stock analysis project, leading to feedback from industry experts!",
          comments: [],
        },
        {
          id: 4,
          title: "Design Internship: Creativity Unleashed",
          author: "Rohan Singh",
          content: "As a design intern, I created UI mockups for a startup. The freedom to experiment was incredible, and I learned Adobe XD.",
          date: "2025-04-03",
          uniqueFeature: "Resume Builder: Internshala’s free resume tool helped me highlight my UI projects, boosting my profile!",
          comments: [],
        },
        {
          id: 5,
          title: "Remote Internship Challenges",
          author: "Meera Desai",
          content: "Working remotely for a tech company was tough due to time zones, but I mastered video conferencing and delivered a coding project.",
          date: "2025-04-01",
          uniqueFeature: "Flexi-Schedule: Virtual Internships offered a customizable 10-15 hour workweek, perfect for balancing studies!",
          comments: [],
        },
        {
          id: 6,
          title: "My NGO Internship Experience",
          author: "Kunal Mehta",
          content: "Interning at an NGO opened my eyes to social impact. I organized a fundraiser and learned project management skills.",
          date: "2025-03-28",
          uniqueFeature: "Community Feedback: Extern’s community events let me present my fundraiser ideas and get peer reviews!",
          comments: [],
        },
      ];
      setBlogPosts(posts);
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  // Function to update individual comment input
  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  // Function to add a comment to a specific post
  const addComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (commentText) {
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
        )
      );
      setCommentInputs((prev) => ({
        ...prev,
        [postId]: '', // Clear the input for this post only
      }));
    }
  };

  if (loading) return <p className="loading">Loading blog posts...</p>;

  return (
    <div className="blog-container">
      <h1 className="blog-title">Student Internship Blogs</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-author">By {post.author} | {post.date}</p>
            <p className="post-content">{post.content}</p>
            <div className="unique-feature">
              <strong>Unique Feature:</strong> {post.uniqueFeature}
            </div>
            <div className="comment-input">
              <input
                type="text"
                value={commentInputs[post.id] || ''} // Individual input per post
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="Enter your comment..."
                className="comment-input-field"
              />
              <button className="comment-btn" onClick={() => addComment(post.id)}>
                Submit Comment
              </button>
            </div>
            {post.comments.length > 0 && (
              <div className="comments-section">
                <h4 className="comments-title">Comments:</h4>
                <ul className="comments-list">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;