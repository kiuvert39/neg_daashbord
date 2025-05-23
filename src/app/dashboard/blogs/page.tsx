'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "@/ui/dashboard/products/products.module.css"
import Search from "@/ui/dashboard/search/search";
import { blogPostService } from "@/services/post.service";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  description: string;
  subject: string;
  image?: string;
  created_at: string;
}

const BlogsPage = ({ searchParams }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const fetchPosts = async () => {
    try {
      const response = await blogPostService.getPosts();
      // Make sure we're accessing the posts array from the response
      const postsData = response.posts || [];
      // Add default subject if it doesn't exist
      const postsWithSubject = postsData.map((post: Post) => ({
        ...post,
        subject: post.subject || 'General' // Provides a default value if subject is missing
      }));
      setPosts(postsWithSubject);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a blog..." />
        <Link href="/dashboard/blogs/add">
          <button className={styles.addButton}>Add New Blog</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Subject</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post) => (
            <tr key={post.id}>
              <td>
                <div className={styles.product}>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={40}
                      height={40}
                      className={styles.productImage}
                      unoptimized
                    />
                  )}
                  {post.title}
                </div>
              </td>
              <td>{post.description}</td>
              <td>{post?.subject}</td>
              <td>{formatDate(post.created_at)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/blogs/${post.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" value={post.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsPage;