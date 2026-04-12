import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addnewAddress, deleteAddress, editAddress, fetchAddresses } from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./Address-Card";
import { useForm } from "react-hook-form";
import { Plus, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function Address({ setCurrentSelectedAddress, currentSelectedAdddress }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const initialState = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: ""
  };

  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { AddressList } = useSelector((state) => state.addressCart);
  const { toast } = useToast();

  function onSubmit(data) {
    if (AddressList?.length >= 5 && currentEditedId === null) {
      toast({
        title: "Maximum address limit reached",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user.id,
          addressId: currentEditedId,
          formData: data,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddresses(user?.id));
          toast({ title: "Address updated successfully" });
          reset(initialState);
          setCurrentEditedId(null);
          setShowAddressForm(false);
        }
      });
    } else {
      dispatch(
        addnewAddress({
          ...data,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddresses(user?.id));
          toast({ title: "Address added successfully" });
          reset(initialState);
          setShowAddressForm(false);
        }
      });
    }
  }

  function handleEditAddress(address) {
    setCurrentEditedId(address._id);
    setShowAddressForm(true);
    reset({
      address: address.address,
      city: address.city,
      phone: address.phone,
      pincode: address.pincode,
      notes: address.notes,
    });
  }

  function handleDeleteAddress(addressId) {
    dispatch(deleteAddress({ userId: user?.id, addressId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        toast({ title: "Address removed" });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAddresses(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="space-y-8">
      {/* 1. SAVED ADDRESSES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Saved Addresses</h2>
           </div>
           {!showAddressForm && (
             <Button 
               onClick={() => {
                 setShowAddressForm(true);
                 reset(initialState);
                 setCurrentEditedId(null);
               }}
               className="bg-primary text-black font-bold h-10 rounded-xl flex gap-2"
             >
               <Plus size={16} /> ADD NEW
             </Button>
           )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AddressList && AddressList.length > 0 ? (
            AddressList.map((address) => (
              <AddressCard
                key={address._id}
                currentSelectedAdddress={currentSelectedAdddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                address={address}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            ))
          ) : (
             <div className="col-span-full py-12 border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No addresses stored in vault</p>
             </div>
          )}
        </div>
      </div>

      {/* 2. ADDRESS FORM (CONDITIONAL) */}
      {showAddressForm && (
        <Card className="glass border-primary/20 bg-primary/5 animate-in slide-in-from-bottom duration-500 rounded-[2rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-black/40">
            <CardTitle className="text-sm font-black text-white uppercase tracking-widest">
              {currentEditedId !== null ? "Edit Coordinates" : "Register New Address"}
            </CardTitle>
            <button 
              onClick={() => {
                setShowAddressForm(false);
                setCurrentEditedId(null);
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 {/* Address Input */}
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Logistics Address</label>
                    <input
                      placeholder="Street, House No, Landmark"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold"
                      {...register("address", { required: true })}
                    />
                 </div>

                 {/* City & Pincode */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">City / Hub</label>
                    <input
                      placeholder="e.g. Mumbai"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold"
                      {...register("city", { required: true })}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Pin Code</label>
                    <input
                      type="number"
                      placeholder="6-digit code"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold"
                      {...register("pincode", { required: true })}
                    />
                 </div>

                 {/* Phone & Notes */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Secure Contact No</label>
                    <input
                      type="number"
                      placeholder="10-digit primary phone"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold"
                      {...register("phone", { required: true })}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Internal Delivery Notes</label>
                    <input
                      placeholder="e.g. Ring twice, leave at reception"
                      className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold"
                      {...register("notes")}
                    />
                 </div>
              </div>

              <div className="pt-4">
                 <Button 
                    type="submit"
                    className="w-full bg-primary text-black font-black h-16 rounded-2xl text-lg hover:scale-[1.01] transition-all"
                 >
                    {currentEditedId !== null ? "SYNCHRONIZE UPDATE" : "VERIFY & REGISTER ADDRESS"}
                 </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Address;