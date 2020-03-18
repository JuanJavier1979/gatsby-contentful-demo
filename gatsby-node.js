const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulBlogPost(
        filter: {
            node_locale: {eq: "en-US"}
        },
        sort: {
            fields: [createdAt], order: DESC
        }
      ) {
          edges {
              node {
                  id
                  postTitle
                  postSlug
                  createdAt(formatString: "MMMM DD, YYYY")
                  postFeaturedImage {
                      resolutions(width: 300) {
                          ...GatsbyContentfulResolutions
                      }
                  }
              }
          }
      }
    }
  `).then(result => {
    result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
      createPage({
        path: node.postSlug,
        component: path.resolve(`./src/templates/single-post.js`),
        context: {
          // This is the $slug variable
          // passed to single-post.js
          slug: node.postSlug,
          postid: node.id,
        },
      })
    })
  })
}
