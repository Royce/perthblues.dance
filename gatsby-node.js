/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const moment = require("moment");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/event-post.tsx`);
  return graphql(
    `
      query NotesAndEvents {
        notes: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { fields: { source: { eq: "notes" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
              }
              fields {
                slug
                source
              }
            }
          }
        }
        events: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { fields: { source: { eq: "events" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
              }
              fields {
                slug
                source
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create notes posts pages.
    const notes = result.data.notes.edges;

    notes.forEach((note, index) => {
      const previous =
        index === notes.length - 1 ? null : notes[index + 1].node;
      const next = index === 0 ? null : notes[index - 1].node;

      createPage({
        path: note.node.fields.slug,
        component: blogPost,
        context: {
          slug: note.node.fields.slug,
          previous,
          next,
        },
      });
    });

    // Create events posts pages.
    const events = result.data.events.edges;

    events.forEach((event, index) => {
      const previous =
        index === events.length - 1 ? null : events[index + 1].node;
      const next = index === 0 ? null : events[index - 1].node;

      createPage({
        path: event.node.fields.slug,
        component: blogPost,
        context: {
          slug: event.node.fields.slug,
          previous,
          next,
        },
      });
    });
    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `source`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    });

    const dateString = moment(node.frontmatter.date).format("YYYY-MM-DD");
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.slug || `/${node.frontmatter.tag}-${dateString}`,
    });
  }
};
