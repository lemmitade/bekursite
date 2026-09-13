'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface VisionMissionProps {
  vision: string;
  mission: string;
}

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  useScrollReveal();

  return (
    <section className="reveal" id="vision-mission">
      <div className="vm-split">
        <div className="vm-panel vm-panel--vision">
          <span className="vm-panel__label">Our Vision</span>
          <p className="vm-panel__text">{vision}</p>
          <div className="vm-panel__accent" />
        </div>
        <div className="vm-panel vm-panel--mission">
          <span className="vm-panel__label">Our Mission</span>
          <p className="vm-panel__text">{mission}</p>
          <div className="vm-panel__accent" />
        </div>
      </div>
    </section>
  );
}
