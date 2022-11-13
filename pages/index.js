import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { createStarryNight, common } from "@wooorm/starry-night";
import { toH } from "hast-to-hyperscript";
import React, { useEffect, useState } from "react";

export default function Home({ allPostsData }) {
  const [highlightedCode, setHighlightedCode] = useState();

  useEffect(() => {
    highlight().then((node) => setHighlightedCode(node));
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Full Stack Developer</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>{highlightedCode}</section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

async function highlight() {
  const starryNight = await createStarryNight(common);

  const tree = starryNight.highlight('"use strict";', "source.js");
  const reactNode = toH(React.createElement, tree);

  console.log(reactNode);
  return reactNode;
}
