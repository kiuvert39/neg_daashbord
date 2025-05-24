'use client';

import Link from "next/link";
import styles from "@/ui/dashboard/products/products.module.css";
import Search from "@/ui/dashboard/search/search";
import { useEffect, useState } from "react";
import { homepageService } from "@/services/homepage";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const Projects = ({ searchParams }: any) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const page = Number(searchParams?.page || 1);
  const perPage = 10;

  const fetchProjects = async (currentPage: number) => {
    try {
      const response = await homepageService.getProject();
      const allProjects = response.projects || [];

      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      const paginated = allProjects.slice(start, end);

      setProjects(paginated);
      setTotalPages(Math.ceil(allProjects.length / perPage));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a project..." />
        <Link href="/dashboard/projects/add">
          <button className={styles.addButton}>Add New Project</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Content</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: Project) => (
            <tr key={project.id}>
              <td>
                {project.title.slice(0, 50)}
                {project.title.length > 50 ? "..." : ""}
              </td>
              <td>
                {project.content.slice(0, 50)}
                {project.content.length > 50 ? "..." : ""}
              </td>
              <td>{formatDate(project.created_at)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/project/${project.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Update
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

      <div className={styles.pagination}>
        <Button
          size="lg"
          className="bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
          disabled={page <= 1}
          onClick={() => fetchProjects(page - 1)}
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
          onClick={() => fetchProjects(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Projects;
