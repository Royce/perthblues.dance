import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Event from "../components/event";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Spoonful" />
    <Event />
    <Link to="/events">More blues gigs, classes, practice sessions...</Link>
  </Layout>
);

export default IndexPage;
