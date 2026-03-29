import React, { useEffect } from 'react'

// import {projects} from "../data/iotprojects"
import axios from 'axios'
import { ServerURL } from '../App'
// console.log(projects)

import s1 from "../../public/startups/s1.png";
import s2 from "../../public/startups/s2.png";
import s3 from "../../public/startups/s3.png";
import s4 from "../../public/startups/s4.png";
import s5 from "../../public/startups/s5.png";
import s6 from "../../public/startups/s6.png";
import s7 from "../../public/startups/s7.png";
import s8 from "../../public/startups/s8.png";
import s9 from "../../public/startups/s9.png";
// import s1 from "../../public/startups"




const startups = [
  {
    "name": "ParkX",
    "mentor": "No Mentor",
    "image": s1,
    "team": ["Team Members (5 shown in poster)"],
    "desc": "A smart parking solution that turns unused private spaces into convenient parking spots, reducing traffic congestion and providing passive income for property owners."
  },
  {
    "name": "COCOONInn Capsule Stays",
    "mentor": "Dr. Muneesh Sethi",
    "image": s2,
    "team": ["Shikhar Goswami", "Devendra Pratap Singh"],
    "desc": "Capsule accommodation in repurposed shipping containers offering mobility, scalability, and affordable luxurious stays."
  },
  {
    "name": "PRANEXA",
    "mentor": "No Mentor",
    "image": s3,
    "team": ["Team Members (6 shown in poster)"],
    "desc": "An innovative app for animal rescue and online pet consultation with AI + Vet advice, supplements, and fast rescues."
  },
  {
    "name": "CleanQuelll Services",
    "mentor": "Mr. B.D Patel",
    "image": s4,
    "team": ["Amarjeet Sood", "Vaishnavi Paswan"],
    "desc": "Fully automatic cleaning service providing safe water and deep cleaning solutions."
  },
  {
    "name": "VigilXMed Support Pvt. Ltd",
    "mentor": "Dr. Mamta Singh",
    "image": s5,
    "team": ["Vaishnavi Sharma", "Ritik Rajput"],
    "desc": "Blockchain-powered platform to verify medicines, report side effects instantly, and fight counterfeit drugs."
  },
  {
    "name": "SakuRush",
    "mentor": "Mr. B.D Patel",
    "image": s6,
    "team": ["Ayushman Raj", "Ravishankar"],
    "desc": "DIY kits to build 3D models at home, encouraging creativity and passion for crafting."
  },
  {
    "name": "SkyRocket Marketing",
    "mentor": "Dr. Deepak Panjut",
    "image": s7,
    "team": ["Rahul Raj", "Priya Kumari", "Sahil Raj"],
    "desc": "Empowering offline businesses to go online with social media management, content marketing, influencer marketing, and brand strategy."
  },
  {
    "name": "Automatic Wall and Roof Painting Machine",
    "mentor": ["Dr. Nitesh Dutt", "Dr. Manjula Tiwari"],
    "image": s8,
    "team": ["Himanshu Yadav", "Muhammad Shaban", "Rohit Sharma"],
    "desc": "A machine designed for precise and efficient paint application, reducing time and labor for residential, commercial, and industrial applications."
  },
  {
    "name": "Tattava Nature",
    "mentor": "Dr. Muneesh Sethi",
    "image": s9,
    "team": ["Ekta Malhotra", "Anil Singh Negi"],
    "desc": "Handmade articles from nettle plant, hemp plant, and cotton sourced from rural Himalayan villages to promote sustainable livelihoods."
  }
]



// console.log(startups)

const Faltu = () => {
    useEffect(()=>{
    const fetchAI = async()=>{
        const res = await axios.post(`${ServerURL}/api/startup/addallst` , startups, {withCredentials:true});

        console.log("this is mahan response", res);

    }
    fetchAI();

},[])
  return (
    <div>faltu</div>
  )
}

export default Faltu
