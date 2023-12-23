import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './comonents/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Providers from '../store/storeProvide';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })
export const exportDynamic = false
import "../../public/assets/fontawesome/css/all.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css'; 
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; 
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
  title: '68M Holidays',
  description: 'Generated by 68M Holidays',
}



export default function RootLayout({ children }) {
  return (
    
<html lang="en">

      <Head>
      <link rel="stylesheet" href="" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <meta http-equiv="refresh" content="2"></meta>
      </Head>
      <body className={inter.className}>
      
      <Providers>
        <Navbar />
        
        {children}
        </Providers>
        </body>
        
    </html>
    
  )
}
