import { Github, Mail, BookOpen } from 'lucide-react';

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2C1810] text-[#E5DCC8] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* About */}
          <div>
            <h3
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-2xl text-white mb-4"
            >
              Paleopatología
            </h3>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-[#D4C9B3] leading-relaxed">
              Un proyecto educativo dedicado a revelar la historia de la enfermedad humana a través
              del estudio de restos arqueológicos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xl text-white mb-4"
            >
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Qué es', href: '#que-es' },
                { label: 'Colección', href: '#coleccion' },
                { label: 'Recursos', href: '#recursos' },
                { label: 'Sobre el proyecto', href: '#sobre' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-[#D4C9B3] hover:text-[#C1440E] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xl text-white mb-4"
            >
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@paleopatologia.edu"
                className="flex items-center gap-3 text-[#D4C9B3] hover:text-[#C1440E] transition-colors duration-200"
              >
                <Mail size={20} />
                <span style={{ fontFamily: 'var(--font-body)' }}>info@paleopatologia.edu</span>
              </a>
              <a
                href="#recursos"
                className="flex items-center gap-3 text-[#D4C9B3] hover:text-[#C1440E] transition-colors duration-200"
              >
                <BookOpen size={20} />
                <span style={{ fontFamily: 'var(--font-body)' }}>Recursos educativos</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D4C9B3] hover:text-[#C1440E] transition-colors duration-200"
              >
                <Github size={20} />
                <span style={{ fontFamily: 'var(--font-body)' }}>Proyecto en GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#6B5D52] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-sm text-[#D4C9B3]">
              © 2026 Museo Virtual de Paleopatología. Con fines educativos.
            </p>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-sm text-[#D4C9B3]">
              Imágenes por{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C1440E] hover:underline"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
