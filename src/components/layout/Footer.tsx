
export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} বাংলা শপ। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-xs mt-1">একটি বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
        <div className="mt-4">
          <a 
            href="https://otieu.com/4/9416953" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            aria-label="Advertisement"
          >
            Advertisement
          </a>
        </div>
      </div>
    </footer>
  );
}

    