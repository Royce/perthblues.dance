/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
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
                slug
              }
              fields {
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
                slug
              }
              fields {
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
        path: note.node.frontmatter.slug,
        component: blogPost,
        context: {
          slug: note.node.frontmatter.slug,
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
        path: event.node.frontmatter.slug,
        component: blogPost,
        context: {
          slug: event.node.frontmatter.slug,
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
    const value = getNode(node.parent).sourceInstanceName;
    createNodeField({
      name: `source`,
      node,
      value,
    });
  }
};
