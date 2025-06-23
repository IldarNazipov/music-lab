import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const ErrorPage = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <div className="w-[431px] flex flex-col items-center">
      <h1 className="text-white text-[160px] leading-[168px]">404</h1>
      <div className="flex">
        <h2 className="text-white text-[32px] leading-[52px] mr-[8px]">
          Страница не найдена
        </h2>
        <div className="bg-[url(./assets/images/crying.svg)] w-[52px] h-[52px]"></div>
      </div>
      <h3 className="text-[#4E4E4E]">Возможно, она была удалена</h3>
      <h3 className="text-[#4E4E4E] pb-[36px]">
        или перенесена на другой адрес
      </h3>
      <Button variant="purple" className="h-[52px] px-[45px] py-[14px] w-auto">
        <Link to="/"> Вернуться на главную</Link>
      </Button>
    </div>
  </div>
);
