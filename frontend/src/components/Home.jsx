import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './global/Navbar';
import Hero from './Hero';
import FeaturedJobs from './FeaturedJobs';
import Footer from './global/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScrollingHeadline from './ScrollingHeadline';

const Home = () => {
  useGetAllJobs();

  const { User } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (User?.role === 'Recruiter') {
      navigate("/admin/companies");
    }
  }, [User, navigate]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className='bg-[#f5f2f1]'>
      <Navbar />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
        <Hero />
	  <ScrollingHeadline/>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
        <FeaturedJobs />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
