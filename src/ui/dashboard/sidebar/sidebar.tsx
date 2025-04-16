"use client";

import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      { title: "concept section", path: "/dashboard/market", icon: <MdAttachMoney /> },
      { title: "description", path: "/dashboard/description", icon: <MdAttachMoney /> },
      { title: "videos", path: "/dashboard/videos", icon: <MdAttachMoney /> },
    ],
  },

];

const Sidebar = () => {
  const router = useRouter();
  const user = { img: "/noavatar.png", username: "Default User" };

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

      {/* Scrollable List of Menu Items */}
      <div className="overflow-y-auto flex-grow">
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
      </div>

      {/* Logout Button */}
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
