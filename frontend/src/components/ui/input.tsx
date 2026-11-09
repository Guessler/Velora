import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 ... placeholder:text-muted-foreground ...", // удален md:text-sm
        className,
      )}
      {...props}
    />
  );
}

export { Input };
