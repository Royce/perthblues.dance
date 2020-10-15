import React from "react";
import moment from "moment";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Template({ data, pageContext }) {
  const { markdownRemark: post } = data;
  const { previous, next } = pageContext;
  const m = moment(post.frontmatter.date);
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="">
        <div className="bg-red-800 text-white rounded w-12 float-left text-center mr-3">
          {m.format("MMM").toLocaleUpperCase()}
          <br />
          {m.format("DD")}
        </div>
        <h1 className="text-xl uppercase my-3 py-2">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.venue &&
          <p>{post.frontmatter.title}, {post.frontmatter.venue}, {post.frontmatter.time}</p>
        }
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
      <ul className="flex justify-between list-none p-0 mt-8">
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {MiniDateBlock(previous.frontmatter.date)}{" "}
              {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} {MiniDateBlock(next.frontmatter.date)} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
}

function MiniDateBlock(dateString: string) {
  const m = moment(dateString);
  return (
    <div className="inline bg-red-800 text-white text-sm rounded p-1 px-2">
      {m.format("MMM D").toLocaleUpperCase()}
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
        venue
        time
      }
      fields {
        slug
      }
    }
  }
`;
