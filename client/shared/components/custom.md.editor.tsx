"use client";

import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";

type CustomMDEditorProps = SimpleMDEReactProps & {
  label?: string;
  name?: string;
  error?: string;
};

const CustomMDEditor = ({
  label,
  name,
  error,
  className,
  defaultValue,
  ...mdEditorProps
}: CustomMDEditorProps) => {
  const [content, setContent] = useState<string | number | readonly string[]>(
    ""
  );

  useEffect(() => {
    if (defaultValue) {
      setContent(defaultValue);
    }
  }, []);

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className={className}>
      {label && <label className="block mb-1 text-sm">{label}</label>}
      <input type="hidden" name={name} defaultValue={content} />
      <SimpleMDE
        {...mdEditorProps}
        value={content.toString()}
        onChange={handleChange}
        className="border border-primary-250 rounded-md"
      />
      {error && <p className="text-sm text-text-error">{error}</p>}
    </div>
  );
};

export default CustomMDEditor;
