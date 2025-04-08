"use client"
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { authService } from "@/services/auth.service";


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Faqs",
        path: "/dashboard/faqs",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Blogs",
        path: "/dashboard/blogs",
        icon: <MdShoppingBag />,
      },
      {
        title: "update hero section",
        path: "/dashboard/hero",
        icon: <MdAttachMoney />,
      },
      {
        title: "update case study section",
        path: "/dashboard/casestudy",
        icon: <MdAttachMoney />,
      },
      {
        title: "projects",
        path: "/dashboard/projects",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter()
  const user = { 
    img: "/noavatar.png", 
    username: "Default User" 
  };
  async function signOut() {
    try {

     await authService.logout()
  
      // Show success message
      toast.success("Logged out successfully");
  
      // Redirect to login page
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  }

  return (
    <div className={styles?.container}>
      <div className={styles?.user}>
        <Image
          className={styles?.userImage}
          src={user?.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles?.userDetail}>
          <span className={styles?.username}>{user?.username}</span>
          <span className={styles?.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat?.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item?.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        <button type="submit" className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
