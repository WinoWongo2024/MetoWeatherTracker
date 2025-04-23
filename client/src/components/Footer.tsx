import { formatDate } from "@/lib/utils";

interface FooterProps {
  lastUpdated: Date;
}

export default function Footer({ lastUpdated }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const formattedLastUpdated = formatDate(lastUpdated);
  
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a5 5 0 0 0-10 0"></path>
                <line x1="12" y1="9" x2="12" y2="2"></line>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
                <line x1="19.78" y1="10.22" x2="18.36" y2="11.64"></line>
                <line x1="1" y1="18" x2="3" y2="18"></line>
                <line x1="21" y1="18" x2="23" y2="18"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="19.78" y1="19.78" x2="18.36" y2="18.36"></line>
              </svg>
              <h2 className="text-lg font-bold">Méto ÖestVèl</h2>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Providing accurate weather data since 2005</p>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center md:text-right">
            <p>&copy; {currentYear} Méto ÖestVèl. All rights reserved.</p>
            <p className="mt-1">Data refreshed at <span>{formattedLastUpdated}</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
