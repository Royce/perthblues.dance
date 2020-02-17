import React from "react";
import _ from "lodash";
import moment from "moment";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function cleanExcerpt(input: string): string {
  return input.split(/(\s+Location|\.\s+Lead Pencil Blues)/)[0];
}

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const months = _.groupBy(posts, ({ node: post }) =>
    moment(post.frontmatter.date).format("YY-MM")
  );
  return (
    <Layout>
      <SEO title="Upcoming" />
      <h1 className="text-xl">Get your blues dance fix!</h1>
      <div className="blog-posts">
        {_.map(months, (posts, k) => (
          <>
            <h2 className="clearfix text-lg mt-5 border-b-2 border-red-800">
              {moment(posts[0].node.frontmatter.date).format("MMMM")}
            </h2>
            {posts
              .filter(({ node: post }) => post.frontmatter.title.length > 0)
              .map(({ node: post }) => {
                const m = moment(post.frontmatter.date);
                return (
                  <div className="clearfix my-3" key={post.id}>
                    <div className="float-left w-16 m-1 rounded bg-red-800 text-white text-center">
                      {m.format("ddd").toLocaleUpperCase()}
                      <br />
                      {m.format("DD").toLocaleUpperCase()}
                    </div>
                    <div className="bg-yellow-300 ml-16">
                      <h1 className="font-bold text-xl">
                        <Link
                          className="hover:underline"
                          to={post.frontmatter.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h1>
                      <p className="pl-0">
                        {cleanExcerpt(post.excerpt)}
                        {"... "}
                        <span className="text-orange-800 text-right underline hover:text-black">
                          <Link to={post.frontmatter.slug}>
                            Further details >>
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </>
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query EventIndexQuery {
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
