import React from "react";

// Importing Logomarks (icons ending in 1)
import KintsugiIcon from "../../assets/logotext_SocialProof/Kintsugi1.png";
import MagnoliaIcon from "../../assets/logotext_SocialProof/Magnolia1.png";
import OdeaoLabsIcon from "../../assets/logotext_SocialProof/OdeaoLabs1.png";
import SisyphusIcon from "../../assets/logotext_SocialProof/Sisyphus1.png";
import StackedLabIcon from "../../assets/logotext_SocialProof/StackedLab1.png";
import WarpspeedIcon from "../../assets/logotext_SocialProof/Warpspeed1.png";

// Importing Logotexts (no number)
import KintsugiText from "../../assets/logotext_SocialProof/Kintsugi.png";
import MagnoliaText from "../../assets/logotext_SocialProof/Magnolia.png";
import OdeaoLabsText from "../../assets/logotext_SocialProof/OdeaoLabs.png";
import SisyphusText from "../../assets/logotext_SocialProof/Sisyphus.png";
import StackedLabText from "../../assets/logotext_SocialProof/StackedLab.png";
import WarpspeedText from "../../assets/logotext_SocialProof/Warpspeed.png";

export default function SocialProof() {
  const logos = [
    { name: "OdeaoLabs", icon: OdeaoLabsIcon, text: OdeaoLabsText },
    { name: "Kintsugi", icon: KintsugiIcon, text: KintsugiText },
    { name: "StackedLab", icon: StackedLabIcon, text: StackedLabText },
    { name: "Magnolia", icon: MagnoliaIcon, text: MagnoliaText },
    { name: "Warpspeed", icon: WarpspeedIcon, text: WarpspeedText },
    { name: "Sisyphus", icon: SisyphusIcon, text: SisyphusText },
  ];

  return (
    <section className="bg-[#0B3A60] py-16 w-full">
      <div className="flex flex-col items-center gap-8 w-full max-w-7xl px-4 mx-auto">
        <p className="text-white text-sm font-medium opacity-90 text-center">
          Join 4,000+ companies already growing
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-3">
              <img
                src={logo.icon}
                alt={`${logo.name} icon`}
                className="h-8 w-auto object-contain" 
              />
              <img
                src={logo.text}
                alt={`${logo.name} text`}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}