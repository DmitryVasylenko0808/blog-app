import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ComponentPropsWithRef } from "react";

const components = {
  h1: (props: ComponentPropsWithRef<"h1">) => (
    <h1 {...props} className="mb-8">
      {props.children}
    </h1>
  ),
  h2: (props: ComponentPropsWithRef<"h2">) => (
    <h2 {...props} className="mb-8">
      {props.children}
    </h2>
  ),
  h3: (props: ComponentPropsWithRef<"h3">) => (
    <h3 {...props} className="mb-8">
      {props.children}
    </h3>
  ),
  h4: (props: ComponentPropsWithRef<"h4">) => (
    <h4 {...props} className="mb-8">
      {props.children}
    </h4>
  ),
  h5: (props: ComponentPropsWithRef<"h5">) => (
    <h5 {...props} className="mb-8">
      {props.children}
    </h5>
  ),
  h6: (props: ComponentPropsWithRef<"h6">) => (
    <h6 {...props} className="mb-8">
      {props.children}
    </h6>
  ),
  p: (props: ComponentPropsWithRef<"p">) => (
    <p {...props} className="mb-6">
      {props.children}
    </p>
  ),
  a: (props: ComponentPropsWithRef<"a">) => (
    <a {...props} className="text-primary-300 underline hover:text-primary-400">
      {props.children}
    </a>
  ),
  ul: (props: ComponentPropsWithRef<"ul">) => (
    <ul {...props} className="mb-6 space-y-3 list-disc list-inside">
      {props.children}
    </ul>
  ),
  ol: (props: ComponentPropsWithRef<"ol">) => (
    <ol {...props} className="mb-6 list-decimal list-inside">
      {props.children}
    </ol>
  ),
};

const CustomMDX = (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};

export default CustomMDX;
