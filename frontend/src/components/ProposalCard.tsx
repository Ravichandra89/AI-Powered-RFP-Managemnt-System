import type { Proposal } from "../types/proposal.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProposalCardProps {
  proposal: Proposal;
  vendorName?: string;
}

const ProposalCard = ({ proposal, vendorName }: ProposalCardProps) => {
  return (
    <Card className="w-full border shadow-sm p-4 mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Proposal from {vendorName ?? proposal.vendorId}
          </CardTitle>

          <Badge>
            Score: {proposal.complianceScore ?? proposal.complianceScore}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">

        {proposal.summary && (
          <p className="italic text-gray-700 border-l-4 border-gray-300 pl-2">
            {proposal.summary}
          </p>
        )}

        {/* Core Info */}
        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Total Price:</span> $
            {proposal.totalPrice}
          </p>
          <p>
            <span className="font-semibold">Delivery Days:</span>{" "}
            {proposal.deliveryDays}
          </p>
          <p>
            <span className="font-semibold">Payment Terms:</span>{" "}
            {proposal.paymentTerms}
          </p>
          <p>
            <span className="font-semibold">Warranty:</span>{" "}
            {proposal.warrantyYears} year(s)
          </p>
        </div>


        <div>
          <h3 className="font-semibold mb-2">Proposed Items</h3>
          <div className="space-y-2">
            {proposal.items.map((it, idx) => (
              <div key={idx} className="border p-2 rounded-md bg-gray-50">
                <p>
                  <span className="font-semibold">Item:</span> {it.rfpItemId}
                </p>
                <p>
                  <span className="font-semibold">Qty:</span> {it.quantity}
                </p>
                <p>
                  <span className="font-semibold">Unit Price:</span> $
                  {it.unitPrice}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> ${it.total}
                </p>
              </div>
            ))}
          </div>
        </div>


        {proposal.parsedAiJson && (
          <details className="mt-3 cursor-pointer">
            <summary className="font-medium">AI Parsed JSON</summary>
            <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
              {JSON.stringify(proposal.parsedAiJson, null, 2)}
            </pre>
          </details>
        )}
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
