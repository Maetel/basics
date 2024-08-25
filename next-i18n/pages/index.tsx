import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

function index() {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const router = useRouter();
  const [text, setText] = React.useState("");

  const { t } = useTranslation("common");

  useEffect(() => {
    setText(t("button_okay"));
  }, [router.locale]); // router.locale을 감지하지 않으면 언어가 바뀌어도 단어 리렌더링을 하지 않는다

  return (
    <div>
      <Link href={router.pathname} className="hover:underline" locale={"ko"}>
        한글페이지로 가기
      </Link>

      <Link href={router.pathname} className="hover:underline" locale={"en"}>
        영어페이지로 가기
      </Link>
      <h1 className="mt-2">현재 언어 (i18n locale) : {locale}</h1>
      <h1>현재 언어 (router locale) : {router.locale}</h1>

      <div className="mt-2">번역된 언어 (/public/locales)</div>
      <div>Client side : {text}</div>
      <div>Server side : {t("button_okay")}</div>
      <div className="mt-2">
        {/* https://www.i18next.com/translation-function/interpolation */}
        변수가 있는 번역 : {t("text_with_variable", { variable: "임의변수" })}
      </div>
    </div>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ko", ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default index;
