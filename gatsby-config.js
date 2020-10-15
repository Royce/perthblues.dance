module.exports = {
  siteMetadata: {
    title: `Sugar Bowl Blues - Perth Blues Dance`,
    description: `Sugar Bowl Blues. Social dancing and practicing Blues Idiom Dances. Perth, Australia.`,
    author: `Royce Townsend; Cassie Hayton`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/notes`,
        name: `notes`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/events`,
        name: `events`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: `<!-- more -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: "gatsby-remark-better-embed-video",
            options: {
              width: 800,
              // ratio: 1.77, // Optional: Defaults to 16/9 = 1.77.
              // height: 400, // Optional: Overrides optional.ratio.
              // related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              // noIframeBorder: true, // Optional: Disable insertion of <style> border: 0.
              // showInfo: false // Optional: Hides video title and player actions.
            },
          },
          "gatsby-remark-responsive-iframe",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_new",
              rel: "nofollow",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "perthblues.dance",
        region: "ap-southeast-2",
      },
    },
  ],
};
