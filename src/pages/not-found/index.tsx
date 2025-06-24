import { Button } from "@/ui/button";
import { Title } from "@/ui/title";
import { Link } from "react-router";

export const NotFoundPage = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <div className="w-[431px] flex flex-col items-center">
      <Title tag="h1" size={160}>
        404
      </Title>

      <div className="flex items-center">
        <Title tag="h2" size={32} className="mr-[8px]">
          Страница не найдена
        </Title>
        <div className="bg-[url(./assets/images/crying.svg)] w-[52px] h-[52px]"></div>
      </div>

      <Title tag="h3" size="lg" color="gray">
        Возможно, она была удалена
      </Title>
      <Title tag="h3" size="lg" color="gray" className="pb-[36px]">
        или перенесена на другой адрес
      </Title>

      <Button variant="purple">
        <Link to="/"> Вернуться на главную</Link>
      </Button>
    </div>
  </div>
);
