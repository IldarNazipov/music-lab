import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth/use-auth";
import { logIn, type LogInParams } from "@/api/user/log-in";
import axios from "axios";
import { Logo } from "@/components/logo";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(20, "Не более 20 символов"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const LogInForm = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LogInParams) => {
    try {
      await logIn(values);
      setAuth(true);
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
          </Card>
        </form>
      </Form>
    </div>
  );
};
