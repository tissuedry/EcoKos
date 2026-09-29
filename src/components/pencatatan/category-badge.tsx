import { CookingPot, Lightbulb, Snowflake, Zap, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LogCategory } from "@/types";

const CATEGORY_STYLE: Record<LogCategory, { icon: LucideIcon; tone: "mint" | "cyan" | "neutral" }> = {
  Pendingin: { icon: Snowflake, tone: "mint" },
  "Dapur Kos": { icon: CookingPot, tone: "cyan" },
  "Gadget & Lampu": { icon: Lightbulb, tone: "neutral" },
  "Beban Berat": { icon: Zap, tone: "mint" },
};

export function CategoryBadge({ category }: { category: LogCategory }) {
  const { icon: Icon, tone } = CATEGORY_STYLE[category];
  return (
    <Badge tone={tone} icon={<Icon className="size-3" />}>
      {category}
    </Badge>
  );
}
