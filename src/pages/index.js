import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Contentful blog posts:</h1>
    {data.allContentfulBlogPost.edges.map(({ node }) => (
      <section key={node.id} className="section">
        <h3 className='title is-3'>{node.postTitle}</h3>
        <Link to={node.postSlug}>Go to post</Link>
      </section>
    ))}
  </Layout>
)

export default IndexPage;

export const pageQuery = graphql`
  query pageQuery {
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
`