import React from "react";
import { motion } from "framer-motion";
import { FaBox } from "react-icons/fa";
import { useForm } from "react-hook-form";

const AddParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="px-12 py-25 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl text-primary text-center font-bold mb-6"
      >
        Add Parcel
      </motion.h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-lg rounded-xl">
        {/* Parcel Type */}
        <p className="font-semibold text-2xl mb-5">Enter your parcel details</p>
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
          <div>
            <input
              type="text"
              placeholder="Parcel Weight (gm)"
              className="input input-bordered w-full"
              {...register("parcelWeight", {
                required: "Parcel weight is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Please enter a valid number",
                },
              })}
            />
            {errors.parcelWeight && <span className="text-red-500">{errors.parcelWeight.message}</span>}
          </div>
        </div>

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
                  {...register("pickupHouse", { required: "Pickup house is required" })}
                >
                  <option value="" disabled selected>
                    Select Pickup Wise House
                  </option>
                  <option value="House A">House A</option>
                  <option value="House B">House B</option>
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
                    Select your region
                  </option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                </select>
                {errors.senderRegion && <span className="text-red-500">{errors.senderRegion.message}</span>}
              </div>
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
                  {...register("deliveryHouse", { required: "Delivery house is required" })}
                >
                  <option value="" disabled selected>
                    Select Delivery Wise House
                  </option>
                  <option value="House X">House X</option>
                  <option value="House Y">House Y</option>
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
                    Select your region
                  </option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                </select>
                {errors.receiverRegion && <span className="text-red-500">{errors.receiverRegion.message}</span>}
              </div>
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