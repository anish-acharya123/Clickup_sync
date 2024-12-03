import { cn } from "@/libs/utils";
import React from "react";

interface ButtonPorps extends React.ComponentPropsWithRef<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonPorps>(
  ({ className, ...props }, ref) => (
    <button className={cn(className)} {...props} ref={ref} />
  )
);

Button.displayName = "Button";

export default Button;
