import { Link } from "react-router";

import { Button } from "@/common/components/button";
import { CryingIcon } from "@/common/components/crying-icon";
import { Title } from "@/common/components/title";

export const NotFoundPage = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <div className="w-[431px] flex flex-col items-center">
      <Title tag="h1" size="7xl" className="leading-none">
        404
      </Title>

      <div className="flex items-center">
        <Title tag="h2" size="3xl" className="mr-[8px]">
          Страница не найдена
        </Title>
        <CryingIcon />
      </div>

      <Title
        tag="h3"
        size="lg"
        className="pb-[36px] text-center text-muted-foreground"
      >
        <div>Возможно, она была удалена</div>
        <div>или перенесена на другой адрес</div>
      </Title>

      <Button variant="purple">
        <Link to="/"> Вернуться на главную</Link>
      </Button>
    </div>
  </div>
);
