import React from "react";
import { motion } from "framer-motion";
import { FaBox } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const warehouses = useLoaderData();
  
  // Get unique regions from warehouse data
  const regions = [...new Set(warehouses.map(warehouse => warehouse.region))];

  // Watch form fields for calculations
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelType = watch("parcelType");
  const parcelWeight = watch("parcelWeight");
  const pickupHouse = watch("pickupHouse");
  const deliveryHouse = watch("deliveryHouse");

  // Filter districts based on selected region
  const getDistrictsByRegion = (region) => {
    return warehouses
      .filter(warehouse => warehouse.region === region)
      .map(warehouse => warehouse.district);
  };

  // Calculate shipping cost based on the pricing structure
  const calculateShippingCost = (data) => {
    const isSameCity = data.pickupHouse === data.deliveryHouse;
    let basePrice = 0;
    let additionalCost = 0;
    let description = "";
    let weightInfo = "";

    if (data.parcelType === "Document") {
      basePrice = isSameCity ? 60 : 80;
      description = `Document (${isSameCity ? "Within City" : "Outside City/District"})`;
      weightInfo = "Weight not applicable for documents";
    } else {
      // Non-Document
      const weight = parseFloat(data.parcelWeight) || 0;
      weightInfo = `${weight} kg`;
      
      if (weight <= 3) {
        basePrice = isSameCity ? 110 : 150;
        description = `Non-Document (Up to 3kg, ${isSameCity ? "Within City" : "Outside City/District"})`;
      } else {
        basePrice = isSameCity ? 110 : 150;
        const extraWeight = Math.ceil(weight - 3);
        additionalCost = extraWeight * 40;
        if (!isSameCity) {
          additionalCost += 40; // Additional ৳40 for outside city
        }
        description = `Non-Document (>3kg, ${isSameCity ? "Within City" : "Outside City/District"})`;
      }
    }

    const totalCost = basePrice + additionalCost;

    return {
      basePrice,
      additionalCost,
      totalCost,
      description,
      isSameCity,
      weightInfo,
    };
  };

  const onSubmit = (data) => {
    const costDetails = calculateShippingCost(data);
    
    Swal.fire({
      title: 'Shipping Cost Breakdown',
      html: `
        <div class="text-left">
          <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
          ${costDetails.weightInfo ? `<p><strong>Weight:</strong> ${costDetails.weightInfo}</p>` : ''}
          <p><strong>Route:</strong> ${costDetails.isSameCity ? "Within City" : "Outside City/District"}</p>
          <hr class="my-2">
          <p><strong>Base Price:</strong> ৳${costDetails.basePrice}</p>
          ${costDetails.additionalCost > 0 ? `<p><strong>Additional Cost:</strong> ৳${costDetails.additionalCost}</p>` : ''}
          <hr class="my-2">
          <p class="text-xl font-bold text-primary">Total Cost: ৳${costDetails.totalCost}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Confirm Booking',
      confirmButtonColor: '#3b82f6',
      showCancelButton: true,
      cancelButtonText: 'Edit Details',
      focusConfirm: false,
      customClass: {
        popup: 'rounded-xl',
        title: 'text-2xl',
        htmlContainer: 'text-left',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with booking submission
        console.log("Booking confirmed", data);
        // Add your booking submission logic here
      }
    });
  };

  return (
    <div className="px-4 md:px-12 py-20 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl text-primary text-center font-bold mb-6"
      >
        Add Parcel
      </motion.h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-lg rounded-xl">
        {/* Parcel Type */}
        <p className="font-semibold text-xl md:text-2xl mb-5">Enter your parcel details</p>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex gap-4">
            <label className="label cursor-pointer">
              <input
                type="radio"
                value="Document"
                {...register("parcelType", { required: true })}
                className="radio radio-sm radio-primary"
                defaultChecked
              />
              <span className="ml-2">Document</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                value="Non-Document"
                {...register("parcelType", { required: true })}
                className="radio radio-sm radio-primary"
              />
              <span className="ml-2">Non-Document</span>
            </label>
          </div>
          {errors.parcelType && <span className="text-red-500">Parcel type is required</span>}
        </div>

        {/* Parcel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <input
              type="text"
              placeholder="Parcel Name"
              className="input input-bordered w-full"
              {...register("parcelName", { required: "Parcel name is required" })}
            />
            {errors.parcelName && <span className="text-red-500">{errors.parcelName.message}</span>}
          </div>
          {watch("parcelType") === "Non-Document" && (
            <div>
              <input
                type="number"
                step="0.1"
                placeholder="Parcel Weight (kg)"
                className="input input-bordered w-full"
                {...register("parcelWeight", {
                  required: "Parcel weight is required for non-documents",
                  min: {
                    value: 0.1,
                    message: "Weight must be at least 0.1kg"
                  },
                  pattern: {
                    value: /^[0-9.]*$/,
                    message: "Please enter a valid weight",
                  },
                })}
              />
              {errors.parcelWeight && <span className="text-red-500">{errors.parcelWeight.message}</span>}
            </div>
          )}
        </div>

        {/* Rest of the form remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Sender Details */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Sender Details</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                  {...register("senderName", { required: "Sender name is required" })}
                />
                {errors.senderName && <span className="text-red-500">{errors.senderName.message}</span>}
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("pickupHouse", { required: "Pickup warehouse is required" })}
                >
                  <option value="" disabled selected>
                    Select Pickup Warehouse
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={`pickup-${warehouse.district}`} value={warehouse.district}>
                      {warehouse.district} ({warehouse.city})
                    </option>
                  ))}
                </select>
                {errors.pickupHouse && <span className="text-red-500">{errors.pickupHouse.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sender Address"
                  className="input input-bordered w-full"
                  {...register("senderAddress", { required: "Sender address is required" })}
                />
                {errors.senderAddress && <span className="text-red-500">{errors.senderAddress.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sender Contact No"
                  className="input input-bordered w-full"
                  {...register("senderContact", {
                    required: "Sender contact is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.senderContact && <span className="text-red-500">{errors.senderContact.message}</span>}
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("senderRegion", { required: "Sender region is required" })}
                >
                  <option value="" disabled selected>
                    Select sender region
                  </option>
                  {regions.map((region) => (
                    <option key={`sender-region-${region}`} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && <span className="text-red-500">{errors.senderRegion.message}</span>}
              </div>
              {senderRegion && (
                <div>
                  <select
                    className="select select-bordered w-full"
                    {...register("senderDistrict", { required: "Sender district is required" })}
                  >
                    <option value="" disabled selected>
                      Select sender district
                    </option>
                    {getDistrictsByRegion(senderRegion).map((district) => (
                      <option key={`sender-district-${district}`} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.senderDistrict && <span className="text-red-500">{errors.senderDistrict.message}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Receiver Details</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                  {...register("receiverName", { required: "Receiver name is required" })}
                />
                {errors.receiverName && <span className="text-red-500">{errors.receiverName.message}</span>}
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("deliveryHouse", { required: "Delivery warehouse is required" })}
                >
                  <option value="" disabled selected>
                    Select Delivery Warehouse
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={`delivery-${warehouse.district}`} value={warehouse.district}>
                      {warehouse.district} ({warehouse.city})
                    </option>
                  ))}
                </select>
                {errors.deliveryHouse && <span className="text-red-500">{errors.deliveryHouse.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Receiver Address"
                  className="input input-bordered w-full"
                  {...register("receiverAddress", { required: "Receiver address is required" })}
                />
                {errors.receiverAddress && <span className="text-red-500">{errors.receiverAddress.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full"
                  {...register("receiverContact", {
                    required: "Receiver contact is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.receiverContact && <span className="text-red-500">{errors.receiverContact.message}</span>}
              </div>
              <div>
                <select
                  className="select select-bordered w-full"
                  {...register("receiverRegion", { required: "Receiver region is required" })}
                >
                  <option value="" disabled selected>
                    Select receiver region
                  </option>
                  {regions.map((region) => (
                    <option key={`receiver-region-${region}`} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && <span className="text-red-500">{errors.receiverRegion.message}</span>}
              </div>
              {receiverRegion && (
                <div>
                  <select
                    className="select select-bordered w-full"
                    {...register("receiverDistrict", { required: "Receiver district is required" })}
                  >
                    <option value="" disabled selected>
                      Select receiver district
                    </option>
                    {getDistrictsByRegion(receiverRegion).map((district) => (
                      <option key={`receiver-district-${district}`} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.receiverDistrict && <span className="text-red-500">{errors.receiverDistrict.message}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pickup Instruction */}
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Pickup Instruction"
            {...register("pickupInstruction")}
          ></textarea>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          * Pickup Time: 4pm–7pm Approx.
        </div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <button type="submit" className="btn btn-primary w-full">
            Proceed to Confirm Booking
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default AddParcel;