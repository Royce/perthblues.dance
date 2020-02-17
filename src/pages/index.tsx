import React from "react";
import _ from "lodash";
import moment from "moment";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function cleanExcerpt(input: string): string {
  return input.split(/(\s+Location|\.\s+Lead Pencil Blues)/)[0];
}

function Item(post) {
  const m = moment(post.frontmatter.date);
  return (
    <div className="my-3" key={post.id}>
      <div className="float-right m-1 rounded bg-red-800 text-white px-1 relative top-0 -mt-4 sm:-mt-8 -mr-1">
        {m.format("dddd, MMMM D")}
      </div>
      <div className="bg-yellow-100 p-1">
        <h3 className="font-bold text-xl">
          <Link className="hover:underline" to={post.frontmatter.slug}>
            {post.frontmatter.title}
          </Link>
        </h3>
        <p className="pl-0">
          {cleanExcerpt(post.excerpt)}
          {"... "}
          <span className="text-orange-800 text-right underline hover:text-black">
            <Link to={post.frontmatter.slug}>Further details >></Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const spoonful = posts
    .filter(({ node: post }) => post.frontmatter.slug == "/spoonful")
    .map(({ node: post }) => post)[0];

  const lpb = posts
    .filter(({ node: post }) => post.frontmatter.slug == "/lead-pencil-blues")
    .map(({ node: post }) => post)[0];

  return (
    <Layout>
      <SEO title="Welcome" />
      {spoonful && (
        <div className="my-8">
          <h2 className="clearfix text-lg mt-5 border-b-2 border-red-800">
            The next Spoonful is:
          </h2>
          {Item(spoonful)}
          <p>
            The Spoonful is a monthly open level (i.e. beginner friendly) blues
            class followed by social dancing to excellent blues music.
          </p>
        </div>
      )}

      {lpb && (
        <div className="my-12">
          <h2 className="clearfix text-lg mt-5 border-b-2 border-red-800">
            The next Lead Pencil Blues is:
          </h2>
          {Item(lpb)}
          <p>
            Lead Pencil Blues is a facilitated practice session for blues
            dancing enthusiast.
          </p>
        </div>
      )}

      <Link
        className="text-orange-800 text-right underline hover:text-black"
        to="/events"
      >
        More blues gigs, classes, practice sessions...
      </Link>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { fields: { source: { eq: "events" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`;
