
import { Navbar, Main, Footer, Contracts,CarouselFadeExample } from "../components";

function Home() {
  localStorage.removeItem('theftProtection')
  localStorage.removeItem('end_date')
  localStorage.removeItem('contract_id')
  localStorage.removeItem('product_id')
  return (
    <>
      <Navbar />

      <Main />
      <CarouselFadeExample/>
      <Contracts/>
      
      
      <Footer />
    </>
  )
}

export default Home