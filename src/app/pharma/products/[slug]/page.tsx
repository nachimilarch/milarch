"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Pill, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dummy content since actual specifics weren't provided in full detail
const productDetails: Record<string, { name: string, color: string, bg: string, indication: string, description: string }> = {
  "mycocide-vg": { name: "MYCOCIDE Vg™", color: "text-[#00F5D4]", bg: "bg-[#00F5D4]", indication: "Advanced Antifungal Intervention", description: "Targeted therapy to effectively manage and eliminate tenacious fungal infections with high efficacy." },
  "fetogro": { name: "FETOGRO™", color: "text-[#C9A96E]", bg: "bg-[#C9A96E]", indication: "IUGR Support Formulation", description: "A specialized nutritional and pharmaceutical intervention supporting optimal fetal growth and development." },
  "pcomet-m": { name: "PCOMet M™", color: "text-[#7B2FFF]", bg: "bg-[#7B2FFF]", indication: "PCOS Management", description: "Comprehensive metabolic and hormonal regulatory support for women dealing with PolyCystic Ovarian Syndrome." },
  "bzeevit": { name: "BZeeVIT™", color: "text-[#F0F4FF]", bg: "bg-[#F0F4FF]", indication: "Essential Multivitamin Support", description: "A balanced composition of vital micronutrients ensuring foundational health and combating deficiencies." },
  "symgut": { name: "SYMGUT™", color: "text-[#FF9E00]", bg: "bg-[#FF9E00]", indication: "Advanced Gut Microbiome Support", description: "Restores and maintains optimal intestinal flora dynamics, crucial for systemic health and immunity." },
  "cervive": { name: "CERVIVE™", color: "text-[#FF758F]", bg: "bg-[#FF758F]", indication: "Cervical Health Maintenance", description: "Targeted therapeutic support aimed at maintaining tissue health and cellular integrity in cervical domains." },
};

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productDetails[slug];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-white">
        <h1 className="text-4xl text-white">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 flex justify-center items-start z-20">
      <div className="max-w-5xl w-full">
        
        <Link href="/pharma" className="inline-flex items-center gap-2 text-softwhite/60 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Pharma
        </Link>
        
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Floating 3D-ish Product Box */}
          <motion.div 
            className="flex-1 w-full max-w-sm mx-auto relative aspect-[3/4] bg-navy border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50, rotateY: 30 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Glowing Aura behind box */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 ${product.bg}`} />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl" />
            
            <Pill className={`w-24 h-24 ${product.color} mb-8 z-10`} />
            <h2 className={`text-4xl font-display font-bold text-center z-10 ${product.color}`}>{product.name}</h2>
            <div className={`w-16 h-1 mt-6 rounded-full opacity-50 ${product.bg} z-10`} />
          </motion.div>

          {/* Details Panel */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className={`text-xl font-medium tracking-wide uppercase font-mono mb-8 ${product.color}`}>
                {product.indication}
              </p>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-8">
                <p className="text-lg text-softwhite/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold text-xl mb-4">Key Benefits</h3>
                {[
                  "Clinically tested efficacy.",
                  "Formulated specifically for advanced women's health needs.",
                  "Highest standards of GMP manufacturing."
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${product.color}`} />
                    <p className="text-softwhite/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
