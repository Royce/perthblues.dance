import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Events" />
      <div className="blog-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div className="" key={post.id}>
                <h1 className="font-bold text-xl">
                  <Link to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <h2>{post.frontmatter.date}</h2>
                <p>{post.excerpt}</p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query EventIndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { source: { eq: "events" } } }
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
