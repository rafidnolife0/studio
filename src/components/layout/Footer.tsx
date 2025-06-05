
import Script from 'next/script';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} বাংলা শপ। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-xs mt-1">একটি বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
        
        {/* Ad Slot 5: Footer - Updated to Social Bar */}
        <div className="mt-4 ad-container-footer flex justify-center min-h-[50px] bg-muted/10">
           <Script
            src="//personalengage.com/e0/6a/a6/e06aa63f316c66acd005cbe3ead506ee.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </footer>
  );
}
