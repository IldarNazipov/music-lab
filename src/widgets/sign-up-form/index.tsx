import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { register, type RegisterParams } from "@/api/user/register";
import { toast } from "react-toastify";
import axios from "axios";

const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(2, "Минимум 2 символа")
      .max(20, "Не более 20 символов"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export const SignUpForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: RegisterParams) => {
    try {
      await register(values);
      form.reset();
      toast.success("Пользователь успешно зарегистрирован");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        form.setError("email", {
          type: "manual",
          message: "Такой пользователь уже существует",
        });
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[366px] flex flex-col px-[44px] pt-7 pb-[38px] gap-0 rounded-[12px]">
            <CardHeader className="flex justify-center mb-[20px]">
              <Link to="/">
                <img
                  src="src/assets/images/logo.svg"
                  alt="Logo"
                  width="48px"
                  height="48px"
                />
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-[30px] p-0 mb-[59px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Логин"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Пароль"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Повторите пароль"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col p-0 gap-[30px]">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                variant="purple"
                className="h-[52px] w-full"
              >
                Зарегистрироваться
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
