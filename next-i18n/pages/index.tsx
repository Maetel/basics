import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const Divider = () => (
  <hr
    style={{
      color: "#d3d3d3",
      backgroundColor: "#d3d3d3",
      height: 5,
      marginTop: 20,
      marginBottom: 20,
    }}
  />
);

function index({ serverSideLocale }: { serverSideLocale: string }) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const router = useRouter();
  const [text, setText] = React.useState("");
  const [clientCookie, setClientCookie] = React.useState("");
  console.log({ serverSideLocale });

  const { t } = useTranslation("common");

  useEffect(() => {
    setText(t("button_okay"));
    setClientCookie(getCookie("NEXT_LOCALE") ?? "undefined");
  }, [router.locale]); // router.locale을 감지하지 않으면 언어가 바뀌어도 단어 리렌더링을 하지 않는다

  return (
    <div>
      <Link
        href={router.pathname}
        className="hover:underline border border-black p-1"
        locale={"ko"}
      >
        "/" 로 가기
      </Link>
      <Link
        href={router.pathname}
        className="hover:underline border border-black p-1"
        locale={"ko"}
      >
        한글페이지로 가기
      </Link>

      <Link
        href={router.pathname}
        className="hover:underline border border-black p-1"
        locale={"en"}
      >
        영어페이지로 가기
      </Link>
      <Divider />
      <h1>현재 언어 (i18n locale) : {locale}</h1>
      <h1>현재 언어 (router locale) : {router.locale}</h1>
      <h1>넥스트 서버에서 넘어온 로케일 : {serverSideLocale}</h1>
      <Divider />

      <div>번역된 언어 (/public/locales)</div>
      <div>Client side : {text}</div>
      <div>Server side : {t("button_okay")}</div>
      <Divider />
      <div>
        {/* https://www.i18next.com/translation-function/interpolation */}
        변수가 있는 번역 : {t("text_with_variable", { variable: "임의변수" })}
      </div>

      <Divider />
      <button
        onClick={() => {
          deleteCookie("NEXT_LOCALE");
          router.reload();
        }}
        className="border border-black p-1 mt-2"
      >
        쿠키삭제
      </button>
      <div>
        쿠키 : NEXT_LOCALE = {clientCookie}
        {/* State가 아닌 직접 getCookie()를 넣게되면 hydration에러 */}
      </div>
      <button
        onClick={() => {
          setCookie("NEXT_LOCALE", "ko");
          router.reload();
        }}
        className="border border-black p-1 mt-2"
      >
        쿠키에 한글넣고 인덱스페이지로 이동
      </button>
      <button
        onClick={() => {
          setCookie("NEXT_LOCALE", "en");
          router.reload();
        }}
        className="border border-black p-1 mt-2"
      >
        쿠키에 영어넣고 인덱스페이지로 이동
      </button>
    </div>
  );
}

export async function getServerSideProps({
  locale,
  req,
  res,
}: GetServerSidePropsContext) {
  locale =
    locale ??
    getCookie("NEXT_LOCALE", {
      req,
      res,
    });

  console.log("ServerSide locale : ", locale);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ko", ["common"])),
      // Will be passed to the page component as props
      serverSideLocale: locale,
    },
  };
}

export default index;
