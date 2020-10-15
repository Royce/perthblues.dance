import React from "react";
import { Link, graphql } from "gatsby";
import * as t from "io-ts";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import { isLeft, Right } from "fp-ts/lib/Either";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Index({ data: _data }: { data: any }) {
  const data = Query.decode(_data);
  if (isLeft(data)) ThrowReporter.report(data);
  const edges = (data as Right<IQuery>).right.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Notes" />
      {edges
       .filter(({node}) => !node.frontmatter.secret)
       .map(({ node: post }) => {
        return (
          <div className="pb-6" key={post.id}>
            <h1 className="font-bold text-xl">
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
            </h1>
            <h2 className="text-sm">{post.frontmatter.date}</h2>
            <p className="pt-2">{post.excerpt}</p>
            <p className="">
              <Link to={post.fields.slug}>More</Link>
            </p>
          </div>
        );
      })}
    </Layout>
  );
}

const Query = t.type({
  allMarkdownRemark: t.type({
    edges: t.array(
      t.type({
        node: t.type({
          excerpt: t.string,
          id: t.string,
          fields: t.type({
            slug: t.string,
          }),
          frontmatter: t.intersection([
            t.type({
              title: t.string,
              date: t.string,
            }),
            t.partial({secret: t.boolean})
          ]),
        }),
      })
    ),
  }),
});
type IQuery = t.TypeOf<typeof Query>;

export const pageQuery = graphql`
  query NotesIndex {
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
            secret
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
