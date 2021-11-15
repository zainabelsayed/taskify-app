import React from "react";
import Navbar from "../navbar/Navbar";
import HeroSection from "../hero-section/HeroSection";
import TaskifyNumbers from '../numbers-section/TaskifyNumbers'
import Footer from "../footer/Footer";
import Features from '../features/Features'
import OneView from '../one-view/OneView'
import Responsive from "../responsive/Responsive"
import './Home.css'
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <TaskifyNumbers/>
      <Features/>
      <OneView/>
      <Responsive/>
      <Footer/>
    </div>
  );
}
