import React from 'react';
import { Timeline } from './ui/timeline';
import { Spotlight } from './ui/spotlight-new';
import { PixelatedCanvas } from './ui/pixelated-canvas';

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          The year 2024 marked the foundation of a new era for the Department of Physical Education (DPE). Starting from the ground up with no formal structure in place, DPE conducted its first Pedagogic League and Annual Sports Meet under the guidance of Mr. Sumanth Sir. Later that year, Mahesh Sir and Veenu Ma'am joined DPE as faculty coordinators. At the heart of this beginning was the founding Core Committee—Harisankar, Benidit George, Siddarth Shankar, Naveen S. Pillai, Reno Reji, and Sneha Sahi—whose efforts helped establish the department's vision and identity. The year concluded with the **first DPE Investiture Ceremony and Inauguration**, laying the foundation for the department's journey and growing legacy.

        </p>
        <div className="w-full flex">
          <PixelatedCanvas
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop"
            width={400}
            height={250}
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="swirl"
            responsive={true}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          The Department of Physical Education (DPE) grew to become the second-largest student body at Christ (Deemed to be University), BYC Campus, with over 250 volunteers. During this period, the department organized workshops on physical health and wellness, conducted the CUBYC-SPO 26 Yoga Tournament and celebrated International Yoga Day. DPE also collaborated with the Student Council to organize sports events during Open Day BYC and partnered with the Office of External Affairs, Central Campus, to celebrate Sports Day for ICC students. The department introduced the St. Chavara Cup, expanding the range of sporting events, organized the LTP Program and training, and established a dedicated system of School Representatives for each school under the guidance of the respective Sports Faculty In-charges, further strengthening coordination and student participation.
        </p>
        <div className="w-full flex">
          <PixelatedCanvas
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop"
            width={400}
            height={250}
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="swirl"
            tintColor="#0ea5e9"
            tintStrength={0.3}
            responsive={true}
          />
        </div>
      </div>
    )
  },
  {
    title: "2026",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          Building on the strong foundation established over the past two years, the Department of Physical Education (DPE) looks toward a future of continued growth, innovation, and excellence. With a vision of becoming one of the most impactful student bodies at Christ (Deemed to be University), DPE aims to expand opportunities for every student through inclusive sporting events, leadership development, wellness initiatives, and inter-campus collaborations. The department aspires to nurture future leaders, strengthen its culture of teamwork and discipline, and establish new traditions that inspire generations of students, leaving a lasting legacy across the university.
        </p>
        <div className="w-full flex">
          <PixelatedCanvas
            src="https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?q=80&w=800&auto=format&fit=crop"
            width={400}
            height={250}
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="repel"
            tintColor="#f43f5e"
            tintStrength={0.3}
            responsive={true}
          />
        </div>
      </div>
    )
  }
];

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen py-24 bg-transparent" id="about">
      {/* Background ambient lighting */}
      <Spotlight />

      <div className="relative z-10 w-full h-full">
        <Timeline
          data={timelineData}
          title="Our Legacy"
          description="A brief look into the milestones that shaped our sporting excellence and dedication to athletics."
        />
      </div>
    </section>
  );
}
