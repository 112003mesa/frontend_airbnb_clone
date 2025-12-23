export const dynamic = "force-dynamic";

import Banner from "./_components/header/Banner";
import Explore from "./_components/header/Explore";
import Footer from "./_components/header/Footer";
import GreatestQutdoors from "./_components/header/GreatestQutdoors";
import Header from "./_components/header/Header";
import Live from "./_components/header/Live";

export default function Home() {
  return (
    <>
    <Header />
    <main>
      <Banner />
      <Explore />
      <Live />
      <GreatestQutdoors 
      img='https://images.unsplash.com/photo-1609688669309-fc15db557633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      title="The Greatest Qutdoors"
      description="Wishlists curated by Airbnb"
      linkText="Get Inspired"
      />
    </main>
    <Footer />
    </>
  );
}
