import { useTranslation } from "next-i18next";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

function index() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const { t } = useTranslation("common");
  return (
    <div>
      <Link href={"/"} className="hover:underline" locale={"ko"}>
        한글페이지로 가기
      </Link>
      <br></br>
      <Link href={"/"} className="hover:underline" locale={"en"}>
        영어페이지로 가기
      </Link>
      <h1>현재 언어 : {locale}</h1>
      <div>번역된 언어 (/public/locales) : {t("button_okay")}</div>
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
