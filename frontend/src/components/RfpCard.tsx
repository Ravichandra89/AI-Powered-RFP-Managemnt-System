import type { Rfp } from "../types/rfp.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RfpCardProps {
  rfp: Rfp;
  onSendClick?: (rfpId: string) => void;
}

const RfpCard = ({ rfp, onSendClick }: RfpCardProps) => {
  const handleSendClick = () => {
    onSendClick?.(rfp._id);
  };

  return (
    <Card className="w-full border shadow-sm p-4 mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{rfp.title}</CardTitle>
          <Badge>{rfp.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* RFP BASE DETAILS */}
        <div className="grid gap-2 text-sm">
          <p>
            <span className="font-semibold">Budget:</span> ${rfp.budget}
          </p>
          <p>
            <span className="font-semibold">Delivery Timeline:</span>{" "}
            {rfp.delivery_timeline_days} days
          </p>
          <p>
            <span className="font-semibold">Payment Terms:</span>{" "}
            {rfp.payment_terms}
          </p>
          <p>
            <span className="font-semibold">Minimum Warranty:</span>{" "}
            {rfp.warranty_min_years} year(s)
          </p>
        </div>

        {/* ITEMS LIST */}
        <div>
          <h3 className="font-semibold mb-2">Items:</h3>

          {Array.isArray(rfp.items) && rfp.items.length > 0 ? (
            <div className="space-y-2">
              {rfp.items.map((item) => (
                <div
                  key={item.item_id}
                  className="border p-2 rounded-md bg-gray-50"
                >
                  <p className="font-medium">
                    {item.name} × {item.quantity}
                  </p>

                  <ul className="list-disc ml-6 text-sm">
                    {Object.entries(item.specs ?? {}).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold capitalize">{key}:</span>{" "}
                        {String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No items specified</p>
          )}
        </div>

        {/* SEND BUTTON */}
        {onSendClick && (
          <Button
            className="w-full mt-4"
            onClick={handleSendClick}
            disabled={rfp.status !== "OPEN"}
          >
            Send RFP to Vendors
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RfpCard;
