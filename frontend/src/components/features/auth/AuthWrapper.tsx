import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/common/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/Card";

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,
  heading,
  backButtonHref,
  backButtonLabel,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader className="flex-row items-center justify-center gap-x-4">
          <Image
            src="/images/logo.svg"
            alt="Stream logo"
            width={40}
            height={40}
          />
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="-mg-2">
          {backButtonLabel && backButtonHref && (
            <Button variant="ghost" className="w-full">
              <Link href={backButtonHref}>{backButtonLabel}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
