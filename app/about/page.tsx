"use client";
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const AboutUsContainer = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Arial', sans-serif;
  background-color: #EAD1CA;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Section = styled(motion.section)`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const AboutUs: React.FC = () => {
  return (
    <AboutUsContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bridging Minds, Building Connections
      </Title>
      <Content>
        <Section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Our Mission</SectionTitle>
          <p>
            We are dedicated to empowering the neurodivergent community by creating
            a supportive and inclusive platform. Our innovative matching algorithm
            connects individuals based on shared interests, experiences, and
            communication styles, fostering meaningful relationships and understanding.
          </p>
        </Section>
        <Section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionTitle>AI Companion</SectionTitle>
          <p>
            Our platform features an advanced LLM-powered AI friend, designed to help
            neurodivergent individuals navigate social situations with confidence.
            This AI companion provides a safe space for practicing social interactions,
            offering guidance and support tailored to each user&apos;s unique needs.
          </p>
        </Section>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionTitle>Community-Driven Approach</SectionTitle>
          <p>
            We believe in the power of community. Our platform encourages peer support,
            shared experiences, and collective growth. By bringing together diverse
            perspectives within the neurodivergent community, we create a rich tapestry
            of understanding and acceptance.
          </p>
        </Section>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SectionTitle>Our Vision</SectionTitle>
          <p>
            We envision a world where neurodiversity is celebrated, and every individual
            has the tools and support to thrive in social settings. Through technology
            and compassion, we&apos;re working towards a more inclusive and understanding society.
          </p>
        </Section>
      </Content>
    </AboutUsContainer>
  );
};

export default AboutUs;