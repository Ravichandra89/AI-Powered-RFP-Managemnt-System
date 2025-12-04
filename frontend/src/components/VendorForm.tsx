import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVendor } from "../store/slices/vendorSlice";
import type { AppDispatch, RootState } from "../store";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="w-full max-w-2xl mx-auto mt-10 p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add Vendor</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Vendor Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Tech Electronics"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="sales@techpro.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="IT Hardware"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+91 9876543210"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            placeholder="Mumbai, India"
            value={form.address}
            onChange={handleChange}
            className="resize-none"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Saving Vendor..." : "Add Vendor"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VendorForm;
