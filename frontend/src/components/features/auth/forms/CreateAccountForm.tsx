"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthWrapper } from "@/components/features/auth/AuthWrapper";
import { Button } from "@/components/ui/common/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { useCreateUserMutation } from "@/graphql/generated/output";
import {
  createAccountSchema,
  type TypeCreateAccountSchema,
} from "@/schemas/auth/create-account.schema";

export default function CreateAccountForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [createUser, { loading: creatingUser }] = useCreateUserMutation({
    onCompleted: () => {
      setIsSuccess(true);
    },
    onError: () => {
      toast.error("Ошибка при регистрация.");
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeCreateAccountSchema) {
    createUser({
      variables: {
        data,
      },
    });
  }

  return (
    <AuthWrapper
      heading="Регистрация"
      backButtonLabel="Есть учетная запись? Войти"
      backButtonHref="/account/login"
    >
      {isSuccess ? (
        <div>Success</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      disabled={creatingUser}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Поле для ввода имени</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      disabled={creatingUser}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Поле для ввода почты</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      disabled={creatingUser}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Поле для ввода пароля</FormDescription>
                </FormItem>
              )}
            />
            <Button className="mt-2 w-full" disabled={!isValid || creatingUser}>
              Продолжить
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
