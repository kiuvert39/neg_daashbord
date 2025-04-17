
import Sidebar from "@/ui/dashboard/sidebar/sidebar"
// import styles from "../ui/dashboard/dashboard.module.css"
import styles from "@/ui/dashboard/dashboard.module.css"
import Navbar from "@/ui/dashboard/navbar/navbar"
import Footer from "@/ui/dashboard/footer/footer"

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default Layout