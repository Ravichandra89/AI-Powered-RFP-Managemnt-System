import { useState } from "react";
import type { Rfp } from "../types/rfp.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  DollarSign,
  Clock,
  CreditCard,
  Shield,
  Package,
  Send,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RfpCardProps {
  rfp: Rfp;
  onSendClick?: (rfpId: string) => void;
  onViewDetails?: (rfpId: string) => void;
}

const statusConfig: Record<string, { class: string; glow: string }> = {
  OPEN: {
    class: "bg-status-open/15 text-status-open border-status-open/40",
    glow: "shadow-[0_0_12px_hsl(155_60%_45%/0.3)]",
  },
  CLOSED: {
    class: "bg-status-closed/15 text-status-closed border-status-closed/40",
    glow: "",
  },
  PENDING: {
    class: "bg-status-pending/15 text-status-pending border-status-pending/40",
    glow: "shadow-[0_0_12px_hsl(40_85%_55%/0.3)]",
  },
  AWARDED: {
    class: "bg-status-awarded/15 text-status-awarded border-status-awarded/40",
    glow: "shadow-[0_0_12px_hsl(250_80%_65%/0.3)]",
  },
};

const RfpCard = ({ rfp, onSendClick, onViewDetails }: RfpCardProps) => {
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemCount = Array.isArray(rfp.items) ? rfp.items.length : 0;

  const details = [
    {
      icon: DollarSign,
      label: "Budget",
      value: `$${rfp.budget.toLocaleString()}`,
    },
    {
      icon: Clock,
      label: "Timeline",
      value: `${rfp.delivery_timeline_days} days`,
    },
    { icon: CreditCard, label: "Payment", value: rfp.payment_terms },
    {
      icon: Shield,
      label: "Warranty",
      value: `${rfp.warranty_min_years} year(s)`,
    },
  ];

  return (
    <TooltipProvider>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full rounded-2xl border overflow-hidden",
          "bg-card border-border",
          "shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          "transition-all duration-500 ease-out",
          "hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]",
          "hover:border-primary/40 hover:-translate-y-1",
          "group"
        )}
      >
        {/* Top gradient line with animation */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[2px]",
            "bg-gradient-to-r from-primary/40 via-accent to-primary/40",
            "transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-40"
          )}
        />

        {/* Shimmer overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            "bg-gradient-to-r from-transparent via-foreground/[0.02] to-transparent",
            "translate-x-[-100%] transition-transform duration-1000",
            isHovered && "translate-x-[100%]"
          )}
        />

        {/* Glow effect */}
        {rfp.status === "OPEN" && (
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-status-open/20 via-transparent to-status-open/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        <CardHeader className="pb-3 relative z-10">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-semibold truncate text-foreground group-hover:text-primary transition-colors duration-300">
                {rfp.title}
              </CardTitle>
              <span className="text-[11px] text-muted-foreground">
                ID:{" "}
                <span className="font-mono text-secondary-foreground">
                  {rfp._id.slice(0, 8)}…
                </span>
              </span>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] font-medium border",
                "transition-all duration-300",
                statusConfig[rfp.status]?.class,
                isHovered && statusConfig[rfp.status]?.glow
              )}
            >
              {rfp.status === "OPEN" && (
                <Sparkles className="w-3 h-3 mr-1 animate-pulse-glow" />
              )}
              {rfp.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {details.map((d, i) => {
              const Icon = d.icon;
              return (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl",
                        "bg-secondary/50 border border-border/50",
                        "hover:bg-secondary hover:border-primary/20",
                        "transition-all duration-300 cursor-default",
                        "group/item"
                      )}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg",
                          "bg-background/80 ring-1 ring-border/50",
                          "group-hover/item:ring-primary/30 group-hover/item:bg-primary/10",
                          "transition-all duration-300"
                        )}
                      >
                        <Icon className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors duration-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground">
                          {d.label}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {d.value}
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-popover border-border text-popover-foreground"
                    sideOffset={8}
                  >
                    <p>
                      {d.label}: {d.value}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Items Collapsible */}
          <Collapsible open={isItemsOpen} onOpenChange={setIsItemsOpen}>
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "w-full flex justify-between items-center px-4 py-3",
                  "bg-secondary/50 border border-border/50 rounded-xl",
                  "hover:bg-secondary hover:border-primary/20",
                  "transition-all duration-300 group/trigger"
                )}
              >
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <Package className="w-4 h-4 text-muted-foreground group-hover/trigger:text-primary transition-colors" />
                  <span>Items</span>
                  <span className="text-muted-foreground">({itemCount})</span>
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-all duration-300",
                    "group-hover/trigger:text-primary",
                    isItemsOpen && "rotate-180"
                  )}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pt-3 space-y-2">
                {itemCount ? (
                  rfp.items.map((it, idx) => (
                    <div
                      key={it.item_id}
                      className={cn(
                        "p-3 rounded-xl bg-secondary/30 border border-border/30",
                        "hover:border-primary/30 hover:bg-secondary/50",
                        "transition-all duration-300"
                      )}
                      style={{ animationDelay: `${idx * 75}ms` }}
                    >
                      <div className="flex justify-between items-center text-foreground">
                        <span className="text-sm font-medium truncate">
                          {it.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/15 text-primary border-0"
                        >
                          ×{it.quantity}
                        </Badge>
                      </div>

                      {it.specs && Object.keys(it.specs).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(it.specs).map(([k, v]) => (
                            <span
                              key={k}
                              className="px-2 py-0.5 text-[11px] bg-muted/50 text-muted-foreground rounded-full border border-border/30"
                            >
                              {k}: {String(v)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic text-center py-4">
                    No items added
                  </p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {onViewDetails && (
              <Button
                variant="outline"
                onClick={() => onViewDetails(rfp._id)}
                className={cn(
                  "flex-1 border-border text-muted-foreground",
                  "hover:border-primary/50 hover:text-foreground hover:bg-primary/10",
                  "transition-all duration-300"
                )}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Details
              </Button>
            )}

            {onSendClick && (
              <Button
                disabled={rfp.status !== "OPEN"}
                onClick={() => onSendClick(rfp._id)}
                className={cn(
                  "flex-1 relative overflow-hidden",
                  "bg-primary/80 hover:bg-primary text-primary-foreground",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                )}
              >
                <span className="relative z-10 flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Vendors
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default RfpCard;
