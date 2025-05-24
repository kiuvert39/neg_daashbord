'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "@/ui/dashboard/products/products.module.css"
import Search from "@/ui/dashboard/search/search";
import { blogPostService } from "@/services/post.service";
import { useEffect, useState } from "react";
import { homepageService } from "@/services/homepage";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

const BlogsPage = ({ searchParams }: any) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const fetchPosts = async () => {
    try {
      const response = await homepageService.getLastestCaseStudy()
      // Make sure we're accessing the posts array from the response
      const postsData = response.case_studies || [];

      console.log("data", postsData)
      // Add default subject if it doesn't exist
      const postsWithSubject = postsData.map((post: Post) => ({
        ...post,
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
        <Link href="/dashboard/casestudy/add">
          <button className={styles.addButton}>Add New case study</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>conetent</td>
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
              <td>
                {post.content.length > 50
                  ? post.content.slice(0, 50) + "..."
                  : post.content}
              </td>

              <td>{formatDate(post.created_at)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/casestudy/${post.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <input type="hidden" name="id" />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
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