import { motion } from 'motion/react';

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phone = '5493425683285';
    const message = encodeURIComponent('Hola, quiero información sobre Tablanova');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 text-white flex items-center justify-center transition-shadow duration-200"
      style={{
        backgroundColor: '#5E0F29',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(94,15,41,0.5)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      }}
      aria-label="Contactar por WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0C7.164 0 0 7.164 0 16C0 18.844 0.812 21.5 2.212 23.812L0.688 30.5L7.624 29.012C9.852 30.28 12.372 31 15 31C23.836 31 31 23.836 31 15C31 6.164 23.836 0 15 0H16ZM16 1.5C23.036 1.5 29.5 7.964 29.5 15C29.5 23.036 23.036 29.5 16 29.5C13.54 29.5 11.212 28.812 9.188 27.562L8.812 27.344L3.5 28.5L4.688 23.312L4.438 22.938C3.056 20.812 2.5 18.476 2.5 16C2.5 8.964 8.964 2.5 16 2.5ZM10.812 7.812C10.556 7.812 10.124 7.908 9.75 8.25C9.376 8.592 8.312 9.624 8.312 11.688C8.312 13.752 9.78 15.748 10.004 16.062C10.228 16.376 13 20.812 17.406 22.5C21.192 24.012 21.812 23.748 22.5 23.688C23.188 23.628 24.872 22.656 25.25 21.656C25.628 20.656 25.624 19.812 25.562 19.688C25.5 19.564 25.188 19.436 24.75 19.25C24.312 19.064 22.248 18.032 21.906 17.906C21.564 17.78 21.252 17.718 20.938 18.156C20.624 18.594 19.844 19.436 19.562 19.75C19.28 20.064 19 20.092 18.562 19.906C18.124 19.72 16.688 19.252 14.938 17.656C13.564 16.408 12.624 14.876 12.344 14.438C12.064 14 12.312 13.748 12.5 13.562C12.688 13.376 12.938 13.064 13.124 12.782C13.31 12.5 13.372 12.28 13.5 11.968C13.628 11.656 13.564 11.376 13.5 11.188C13.436 11 12.62 8.936 12.312 8.062C12.004 7.188 11.688 7.844 11.5 7.844C11.312 7.844 11 7.812 10.812 7.812Z"
          fill="currentColor"
        />
      </svg>
    </motion.button>
  );
};
