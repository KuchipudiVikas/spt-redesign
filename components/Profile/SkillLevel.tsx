import Image from "next/image";

type SkillLevel = {
  level: number;
  xp: number;
  icon?: string;
};

export const skillLevel: SkillLevel[] = [
  {
    level: 0,
    xp: 0,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/0.png",
  },
  {
    level: 1,
    xp: 10,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/1.png",
  },
  {
    level: 2,
    xp: 50,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/2.png",
  },
  {
    level: 3,
    xp: 150,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/3.png",
  },
  {
    level: 4,
    xp: 500,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/4.png",
  },
  {
    level: 5,
    xp: 1500,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/5.png",
  },
  {
    level: 6,
    xp: 3000,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/6.png",
  },
  {
    level: 7,
    xp: 5000,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/7.png",
  },
  {
    level: 8,
    xp: 10000,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/8.png",
  },
  {
    level: 9,
    xp: 50000,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/9.png",
  },
  {
    level: 10,
    xp: 100000,
    icon: "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/9b.png",
  },
];

interface SkillLevelProps {
  xp: number;
}

const SkillLevelComp: React.FC<SkillLevelProps> = ({ xp }) => {
  const level =
    skillLevel
      .slice()
      .reverse()
      .find((level) => level.xp <= xp) || skillLevel[0];

  return (
    <div className="text-xl flex flex-col items-center justify-center gap-3 font-bold">
      <span>Level {level?.level}</span>
      <Image
        src={level?.icon || ""}
        alt={`Level ${level?.level}`}
        width={140}
        height={140}
      />
    </div>
  );
};

export default SkillLevelComp;

export function getLevelByXp(xp: number): number {
  const level = skillLevel.find((level) => level.xp > xp);

  return level?.level || 0;
}
