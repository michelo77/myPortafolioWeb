import React from "react";
import { projects } from "@/lib/data";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Github, Play } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 relative scroll-mt-24">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            🚀 Últimos Proyectos
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.2}>
              <GlassCard className="group overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
                {/* Image Section - Top of Card */}
                <a href={`/projects/${project.slug}`} className="block flex-grow cursor-pointer group/link-card hover:bg-white/5 transition-colors duration-300">
                  {project.imageUrl && (
                    <div className="w-full h-48 sm:h-56 overflow-hidden relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  )}

                  {/* Header Section - Title */}
                  <CardHeader className="pb-2">
                    {/* Date if available */}
                    {project.date && (
                      <span className="text-xs font-semibold text-purple-400 mb-1 block uppercase tracking-wider">
                        {project.date}
                      </span>
                    )}
                    <CardTitle className="text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  {/* Content Section - Description */}
                  <CardContent className="flex-grow pt-0">
                    <div className="space-y-2 text-muted-foreground text-sm">
                      {project.description.map((desc, i) => (
                        <p key={i} className="leading-relaxed">
                          {desc}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </a>

                {/* Footer Section - Links */}
                <CardFooter className="flex w-full justify-center items-center gap-6 border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5 py-4 mt-auto">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                    Ver en GitHub 🔗
                  </motion.a>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                    Ver DEMO 🔗
                  </motion.a>
                </CardFooter>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section >
  );
}
