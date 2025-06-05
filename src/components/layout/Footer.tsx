
import Script from 'next/script';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} বাংলা শপ। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-xs mt-1">একটি বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
        
        {/* Ad Slot 5: Footer */}
        <div className="mt-4 ad-container-footer flex justify-center">
           <Script
            src="https://fpyf8.com/88/tag.min.js"
            strategy="lazyOnload"
            data-zone="150831"
            data-cfasync="false"
          />
        </div>
      </div>
    </footer>
  );
}
