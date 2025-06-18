import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <motion.h2
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.4, 0, 0.6, 1], // Custom cubic-bezier for smoothness
          }}
          style={{ willChange: "transform" }}
          className=" my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center text-slate-100 font-extrabold "
        >
          Shorten. Share. Track. Simplify your links in seconds..
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-300 text-lg sm:text-xl text-center mb-10 max-w-2xl"
        >
          Transform long, complex URLs into clean, trackable short links.
          Perfect for social media, marketing campaigns, and sharing.
        </motion.p>

        <motion.form
          onSubmit={handleShorten}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <Input
              value={longUrl}
              type="url"
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="flex-1 h-12 sm:h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
              required
            />
            <Button
              type="submit"
              className="h-12 sm:h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 hover:scale-105"
            >
              Shorten!
            </Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-full"
        >
          <Accordion type="multiple" collapsible className="w-full md:px-11">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:text-blue-400 transition-colors duration-200">
                  What is a URL Shortener and how does it work?
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    When you enter a long URL, our system generates a shorter
                    version of that URL. This shortened URL redirects to the
                    original long URL when accessed.
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:text-blue-400 transition-colors duration-200">
                  Do I need an account to use the app?
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Yes. Creating an account allows you to manage your URLs,
                    view analytics, and customize your short URLs.
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:text-blue-400 transition-colors duration-200">
                  What analytics are available for my shortened URLs?
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    You can view the number of clicks, geolocation data of the
                    clicks and device types (mobile/desktop) for each of your
                    shortened URLs.
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </div>
    </>
  );
}

export default LandingPage;
