import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami - SiapSedia",
  description: "Ada pertanyaan? Hubungi tim dukungan SiapSedia.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-neutral-dark/70">
            Punya pertanyaan, keluhan, atau sekadar ingin mengobrol? Tim kami selalu siap membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-neutral-light/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
            <p className="text-neutral-dark/70 mb-4 text-sm">Kirimkan pertanyaan Anda kapan saja. Kami akan membalas 1x24 jam.</p>
            <a href="mailto:halo@siapsedia.com" className="text-accent font-medium hover:underline">halo@siapsedia.com</a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-neutral-light/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Telepon</h3>
            <p className="text-neutral-dark/70 mb-4 text-sm">Butuh bantuan cepat? Hubungi nomor WhatsApp kami di bawah ini.</p>
            <a href="tel:+6281234567890" className="text-accent font-medium hover:underline">+62 812 3456 7890</a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-neutral-light/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Kantor</h3>
            <p className="text-neutral-dark/70 mb-4 text-sm">Kunjungi markas kami untuk berdiskusi bisnis atau kemitraan.</p>
            <address className="text-accent font-medium not-italic text-sm">
              Gedung Inovasi Lt. 3<br />
              Jl. Teknologi No. 45<br />
              Jakarta, Indonesia
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
