import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/common/components/form";
import { Input } from "@/common/components/input";
import { Button } from "@/common/components/button";
import { useNavigate } from "react-router";
import { register, type RegisterParams } from "@/api/user/register";
import { toast } from "react-toastify";
import axios from "axios";
import { Logo } from "@/common/components/logo";

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
      toast.success("Вы успешно зарегистрировались");
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

  const { isSubmitting } = form.formState;

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[366px] flex flex-col px-[44px] pt-7 pb-[38px] gap-0 rounded-[12px]">
            <CardHeader className="flex justify-center mb-[20px]">
              <Logo />
            </CardHeader>
            <CardContent className="flex flex-col gap-[30px] p-0 mb-[59px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                disabled={isSubmitting}
                type="submit"
                variant="purple"
                fullWidth
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
