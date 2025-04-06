'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "@/ui/dashboard/products/products.module.css";
import Search from "@/ui/dashboard/search/search";
import { useEffect, useState } from "react";
import { homepageService } from "@/services/homepage";
import { Button } from "@/components/ui/button";

interface Faq {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

const FaqPage = ({ searchParams }: any) => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const page = searchParams?.page || 1;
  const perPage = 10; // Adjust per page as needed

  const fetchFaqs = async (currentPage: number) => {
    try {
      const response = await homepageService.getFaq(currentPage, perPage); // Fetch FAQs with pagination
      setFaqs(response.faqs); // Assuming response has a 'faqs' array
      setTotalPages(response.total_pages); // Assuming response includes 'total_pages'
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs(page);
    const interval = setInterval(() => fetchFaqs(page), 30000); // Refresh FAQs every 30 seconds
    return () => clearInterval(interval);
  }, [page]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a FAQ..." />
        <Link href="/dashboard/faqs/add">
          <button className={styles.addButton}>Add New FAQ</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Question</td>
            <td>Answer</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq: Faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>{formatDate(faq.created_at)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/faqs/${faq.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" value={faq.id} />
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
      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <Button
          size="lg"
          className="bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
          disabled={page <= 1}
          onClick={() => fetchFaqs(page - 1)}
        >
          Previous
        </Button>
        <span className="mx-4 text-lg">
          Page {page} of {totalPages}
        </span>
        <Button
          size="lg"
          className="bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
          disabled={page >= totalPages}
          onClick={() => fetchFaqs(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FaqPage;
