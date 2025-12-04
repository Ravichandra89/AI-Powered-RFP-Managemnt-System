import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseRfpFromText, resetParsedRfp } from "../store/slices/rfpSlice";
import type { AppDispatch, RootState } from "../store";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const RfpInputBox: React.FC = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { loading, parsedRfp, error } = useSelector(
    (state: RootState) => state.rfp
  );

  const handleSubmit = () => {
    if (!description.trim()) return;
    dispatch(parseRfpFromText(description));
  };

  const handleReset = () => {
    dispatch(resetParsedRfp());
    setDescription("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10 p-4 border rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Create RFP using Natural Language
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe what you want to procure...
Example: We need 20 laptops with 16GB RAM and 512GB SSD. Delivery in 30 days. Budget 50,000 USD."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[120px] resize-none"
        />

        <div className="flex gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Parse RFP"}
          </Button>

          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {error && <p className="text-sm text-red-600 font-medium">⚠ {error}</p>}

        {parsedRfp && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md border">
            <h3 className="font-semibold mb-2">Parsed RFP Summary</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(parsedRfp, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RfpInputBox;
