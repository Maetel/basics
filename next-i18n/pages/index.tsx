import { useTranslation } from "next-i18next";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

function index() {
  const { t } = useTranslation("common");
  return (
    <div>
      index
      <div>번역언어 : {t("button_okay")}</div>
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
