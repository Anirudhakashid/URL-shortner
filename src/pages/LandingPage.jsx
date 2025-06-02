import React from "react";
import { motion } from "motion/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function LandingPage() {
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <Input
              type="url"
              // onChange={}
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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default LandingPage;
