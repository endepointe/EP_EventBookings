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
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    // {
    //   resolve: `gatsby-source-stripe`,
    //   options: {
    //     objects: ['Balance', 'BalanceTransaction', 'Product', 'ApplicationFee', 'Sku', 'Subscription'],
    //     secretKey: 'stripe_secret_key_here',
    //     downloadFiles: true,
    //   }
    // },
  ],
};