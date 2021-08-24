module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "EP_EventBookings",
  },
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ],
};
