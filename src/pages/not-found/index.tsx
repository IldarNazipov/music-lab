import { Button } from "@/common/components/button";
import { Title } from "@/common/components/title";
import { Link } from "react-router";

export const NotFoundPage = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <div className="w-[431px] flex flex-col items-center">
      <Title tag="h1" size="7xl">
        404
      </Title>

      <div className="flex items-center">
        <Title tag="h2" size="3xl" className="mr-[8px]">
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
