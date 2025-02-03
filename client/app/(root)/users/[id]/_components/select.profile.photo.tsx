"use client";

import { imagesUrl } from "@/constants";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

type SelectProfilePhotoProps = {
  defaultImage?: string;
};

const SelectProfilePhoto = ({ defaultImage }: SelectProfilePhotoProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(`${imagesUrl}/${defaultImage}`);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6 px-20">
      <label
        className="relative flex justify-center items-center w-full h-52 border border-dashed border-primary-250 rounded-md cursor-pointer"
        htmlFor="avatarFile"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col justify-center items-center text-primary-250">
            <Camera size={48} />
            <span>Profile Photo</span>
          </div>
        )}

        <input
          type="file"
          name="avatarFile"
          id="avatarFile"
          aria-label="avatarFile"
          className="outline-0 w-0 h-0 opacity-0"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SelectProfilePhoto;
