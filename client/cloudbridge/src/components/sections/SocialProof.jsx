

// Importing Logomarks (icons ending in 1)
import React from "react";

// Importing Logomarks (icons)
// Note: Changed folder to 'social_proof' and file names to match your screenshot
import KintsugiIcon from "../../assets/social_proof/Kintsugi_icon.png";
import MagnoliaIcon from "../../assets/social_proof/Magnolia_icon.png";
import OdeaoLabsIcon from "../../assets/social_proof/OdeaoLabs_icon.png";
import SisyphusIcon from "../../assets/social_proof/Sisyphus_icon.png";
import StackedLabIcon from "../../assets/social_proof/StackedLab_icon.png";
import WarpspeedIcon from "../../assets/social_proof/Warpspeed_icon.png";

// Importing Logotexts
import KintsugiText from "../../assets/social_proof/Kintsugi.png";
import MagnoliaText from "../../assets/social_proof/Magnolia.png";
import OdeaoLabsText from "../../assets/social_proof/OdeaoLabs.png";
import SisyphusText from "../../assets/social_proof/Sisyphus.png";
import StackedLabText from "../../assets/social_proof/StackedLab.png";
import WarpspeedText from "../../assets/social_proof/Warpspeed.png";
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