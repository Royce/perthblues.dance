import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Query } from "../graphql";

export default function Index({ data }: { data: Query }) {
  const { edges: posts } = data.allMarkdownRemark!;
  return (
    <Layout>
      <SEO title="Notes" />
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="pb-6" key={post.id}>
              <h1 className="font-bold text-xl">
                <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
              </h1>
              <h2 className="text-sm">{post.frontmatter.date}</h2>
              <p className="pt-2">{post.excerpt}</p>
              <p className="">
                <Link to={post.frontmatter.slug}>More</Link>
              </p>
            </div>
          );
        })}
    </Layout>
  );
}

export const pageQuery = graphql`
  query NotesIndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { source: { eq: "notes" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;
