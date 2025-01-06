import React from "react";

interface Badge {
  icon: string;
  name: string;
  description: string;
  level: number;
}

export const BadgeIcon = ({ badge }: { badge: Badge }) => {
  const colors: { [key: string]: { bg: string; text: string; icon: string } } = {
    "streak-bronze": {
      bg: "from-primary/10 to-primary/5",
      text: "text-primary",
      icon: "text-primary"
    },
    "streak-silver": {
      bg: "from-chart-2/10 to-chart-2/5",
      text: "text-chart-2",
      icon: "text-chart-2"
    },
    "streak-gold": {
      bg: "from-chart-4/10 to-chart-4/5",
      text: "text-chart-4",
      icon: "text-chart-4"
    },
    "streak-diamond": {
      bg: "from-chart-5/10 to-chart-5/5",
      text: "text-chart-5",
      icon: "text-chart-5"
    },
    "milestone-bronze": {
      bg: "from-primary/10 to-primary/5",
      text: "text-primary",
      icon: "text-primary"
    },
    "milestone-silver": {
      bg: "from-chart-2/10 to-chart-2/5",
      text: "text-chart-2",
      icon: "text-chart-2"
    },
    "milestone-gold": {
      bg: "from-chart-4/10 to-chart-4/5",
      text: "text-chart-4",
      icon: "text-chart-4"
    },
    "milestone-diamond": {
      bg: "from-chart-5/10 to-chart-5/5",
      text: "text-chart-5",
      icon: "text-chart-5"
    },
    "time-bronze": {
      bg: "from-primary/10 to-primary/5",
      text: "text-primary",
      icon: "text-primary"
    },
    "time-silver": {
      bg: "from-chart-2/10 to-chart-2/5",
      text: "text-chart-2",
      icon: "text-chart-2"
    },
    "time-gold": {
      bg: "from-chart-4/10 to-chart-4/5",
      text: "text-chart-4",
      icon: "text-chart-4"
    },
    "time-diamond": {
      bg: "from-chart-5/10 to-chart-5/5",
      text: "text-chart-5",
      icon: "text-chart-5"
    },
    "special-earlybird": {
      bg: "from-chart-4/10 to-chart-4/5",
      text: "text-chart-4",
      icon: "text-chart-4"
    },
    "special-nightowl": {
      bg: "from-chart-5/10 to-chart-5/5",
      text: "text-chart-5",
      icon: "text-chart-5"
    }
  };

  const icons: { [key: string]: string } = {
    "streak-bronze": "🔥",
    "streak-silver": "🔥",
    "streak-gold": "🔥",
    "streak-diamond": "🔥",
    "milestone-bronze": "⭐",
    "milestone-silver": "⭐",
    "milestone-gold": "⭐",
    "milestone-diamond": "⭐",
    "time-bronze": "⏱️",
    "time-silver": "⏱️",
    "time-gold": "⏱️",
    "time-diamond": "⏱️",
    "special-earlybird": "🌅",
    "special-nightowl": "🌙"
  };

  const badgeStyle = colors[badge.icon] || {
    bg: "from-muted/10 to-muted/5",
    text: "text-muted-foreground",
    icon: "text-muted-foreground"
  };
  
  const badgeIcon = icons[badge.icon] || "⭐";

  return (
    <div className="relative group">
      <div
        className={`
          p-6 
          bg-gradient-to-br ${badgeStyle.bg}
          rounded-lg
          border border-border/50
          hover:border-border
          transition-all
          duration-200
          hover:shadow-lg
          backdrop-blur-sm
        `}
      >
        <div className="flex flex-col gap-3">
          <div className="text-2xl">
            {badgeIcon}
          </div>
          <div>
            <h3 className={`font-semibold ${badgeStyle.text}`}>
              {badge.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {badge.description}
            </p>
          </div>
        </div>
        
        <div className="absolute -top-2 -right-2">
          <div className={`
            px-2 
            py-1 
            rounded-full 
            text-xs 
            font-medium
            bg-background/80
            backdrop-blur-sm
            border border-border/50
            ${badgeStyle.text}
          `}>
            Level {badge.level}
          </div>
        </div>
      </div>
    </div>
  );
};