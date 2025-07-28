import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardContent, CardFooter } from "@/common/components/card";
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
import { Link, useNavigate } from "react-router";
import { logIn, type LogInParams } from "@/api/user/log-in";
import axios from "axios";
import { AuthLayout } from "@/common/components/auth-layout";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(20, "Не более 20 символов"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const LogInForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const onSubmit = async (values: LogInParams) => {
    try {
      await logIn(values);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        form.setError("email", {
          type: "manual",
          message: "Неверный email или пароль",
        });
      }
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AuthLayout>
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
            </CardContent>
            <CardFooter className="flex flex-col p-0 gap-[30px]">
              <Button
                disabled={isSubmitting}
                variant="purple"
                type="submit"
                fullWidth
              >
                Войти
              </Button>
              <Button
                disabled={isSubmitting}
                variant="outline"
                type="button"
                asChild
                fullWidth
              >
                <Link to="/signup">Зарегистрироваться</Link>
              </Button>
            </CardFooter>
          </AuthLayout>
        </form>
      </Form>
    </div>
  );
};
