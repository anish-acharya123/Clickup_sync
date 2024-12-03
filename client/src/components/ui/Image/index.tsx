import { cn } from "@/libs/utils";
import React from "react";

const defaultClass = `max-w-full transition duration-150 ease-out`;

interface ImagePorps extends React.ComponentPropsWithRef<"img"> {}

const Image = React.forwardRef<HTMLImageElement, ImagePorps>(
  ({ className, src, alt, ...props }, ref) => (
    <figure>
      <img
        src={src}
        alt={alt}
        className={cn(className, defaultClass)}
        ref={ref}
        {...props}
      />
    </figure>
  )
);

Image.displayName = "Image";

export default Image;
