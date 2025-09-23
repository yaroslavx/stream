"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  createAccountSchema,
  type TypeCreateAccountSchema,
} from "@/schemas/auth/create-account.schema";

export default function CreateAccountForm() {
  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeCreateAccountSchema) {}

  return (
    <AuthWrapper
      heading="Регистрация"
      backButtonLabel="Есть учетная запись? Войти"
      backButtonHref="/account/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
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
                  <Input placeholder="john.doe@example.com" {...field} />
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
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormDescription>Поле для ввода пароля</FormDescription>
              </FormItem>
            )}
          />
          <Button className="mt-2 w-full" disabled={!isValid}>
            Продолжить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
