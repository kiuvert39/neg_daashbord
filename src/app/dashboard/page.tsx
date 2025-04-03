"use client";
import Card from "@/ui/dashboard/card/card";
import Chart from "@/ui/dashboard/chart/chart";
import Rightbar from "@/ui/dashboard/rightbar/rightbar";
import Transactions from "@/ui/dashboard/transactions/transactions";
import styles from  "../../ui/dashboard/dashboard.module.css"

const cards = [
  { id: 1, title: "Card 1", content: "Content for card 1" },
  { id: 2, title: "Card 2", content: "Content for card 2" },
  { id: 3, title: "Card 3", content: "Content for card 3" },
];

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item: { id: any; }) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
