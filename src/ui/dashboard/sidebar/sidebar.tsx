"use client";

import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdAnalytics,
  MdPeople,
  MdLogout,
} from "react-icons/md";

import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Faqs", path: "/dashboard/faqs", icon: <MdSupervisedUserCircle /> },
      { title: "Blogs", path: "/dashboard/blogs", icon: <MdShoppingBag /> },
      { title: "Update Hero Section", path: "/dashboard/hero", icon: <MdAttachMoney /> },
      { title: "Update Case Study Section", path: "/dashboard/casestudy", icon: <MdAttachMoney /> },
      { title: "Projects", path: "/dashboard/projects", icon: <MdAttachMoney /> },
      { title: "Concept Section", path: "/dashboard/market", icon: <MdAttachMoney /> },
      { title: "Description", path: "/dashboard/description", icon: <MdAttachMoney /> },
      { title: "Videos", path: "/dashboard/videos", icon: <MdAttachMoney /> },
    ],
  },
  {
    title: "Opt-in Page",
    description: "Manage newsletter and lead magnet sections",
    list: [
      { title: "hero section", path: "/dashboard/optin/hero", icon: <MdPeople /> },
      { title: "what's NEG", path: "/dashboard/optin/explaination", icon: <MdAnalytics /> },
      { title: "story", path: "/dashboard/optin/story", icon: <MdAnalytics /> },
      { title: "video", path:"/dashboard/optin/videos", icon: <MdAnalytics /> },
    ],
  },

  {
    title: "Footer Section",
    description: "Manage newsletter and lead magnet sections",
    list: [
      { title: "social medial links", path: "/dashboard/footer/socials", icon: <MdPeople /> }
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const user = { img: "/noavatar.png", username: "Default User" };

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  async function signOut() {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  }

  return (
    <div className={styles?.container}>
      {/* User Info */}
      <div className={styles?.user}>
        <Image
          className={styles?.userImage}
          src={user?.img || "/noavatar.png"}
          alt="avatar"
          width="50"
          height="50"
        />
        <div className={styles?.userDetail}>
          <span className={styles?.username}>{user?.username}</span>
          <span className={styles?.userTitle}>Administrator</span>
        </div>
      </div>

      {/* Menu */}
      <div className="overflow-y-auto flex-grow no-scrollbar">
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <button
                type="button"
                onClick={() => toggleSection(cat.title)}
                className={`${styles.cat} w-full text-left`}
              >
                {cat.title}
              </button>

              {cat.description && openSections[cat.title] && (
                <p className="text-xs text-gray-500 px-3 pt-1">{cat.description}</p>
              )}

              {openSections[cat.title] && (
                <ul className="pl-2">
                  {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        <Button size="lg" type="submit" className={styles.logout}>
          <MdLogout />
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Sidebar;
