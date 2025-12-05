import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVendor } from "../store/slices/vendorSlice";
import type { AppDispatch, RootState } from "../store";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const VendorForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.vendor);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Vendor name and email are required.");
      return;
    }

    dispatch(createVendor(form));
    setForm({ name: "", email: "", category: "", phone: "", address: "" });
  };

  return (
    <Card
      className={cn(
        "w-full max-w-2xl mx-auto mt-10 p-0 overflow-hidden",
        "rounded-xl border",
        "bg-gradient-to-b from-[#2c313a] via-[#2a2f36] to-[#23272f]",
        "border-[#3b414a] shadow-[0_8px_30px_rgba(2,6,23,0.45)]"
      )}
    >
      {/* thin top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-400/50 via-purple-400/50 to-indigo-400/50" />

      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg font-semibold text-white">
          Add Vendor
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-3 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm text-slate-300">
              Vendor Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Tech Electronics"
              value={form.name}
              onChange={handleChange}
              className="bg-[#23282f] border-[#3b424b] text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sales@techpro.com"
              value={form.email}
              onChange={handleChange}
              className="bg-[#23282f] border-[#3b424b] text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm text-slate-300">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              placeholder="IT Hardware"
              value={form.category}
              onChange={handleChange}
              className="bg-[#23282f] border-[#3b424b] text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-sm text-slate-300">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+91 9876543210"
              value={form.phone}
              onChange={handleChange}
              className="bg-[#23282f] border-[#3b424b] text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-sm text-slate-300">
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Mumbai, India"
              value={form.address}
              onChange={handleChange}
              className="bg-[#23282f] border-[#3b424b] text-slate-100 placeholder:text-slate-400 resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={cn(
              "w-full py-2",
              "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
              "hover:brightness-105 shadow-[0_6px_20px_rgba(99,102,241,0.18)]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {loading ? "Saving Vendor..." : "Add Vendor"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorForm;
