import React from 'react';
import HeroSection from '../components/HeroSection';
import EventsShowcase from '../components/EventsShowcase';
import Leaderboard from '../components/Leaderboard';
import MapSection from '../components/MapSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsShowcase />
      <Leaderboard />
      <MapSection />
    </>
  );
}
