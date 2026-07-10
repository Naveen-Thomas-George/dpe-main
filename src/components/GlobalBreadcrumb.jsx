import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

// Custom route-to-title mapping for readability
const routeToTitleMap = {
  '': 'Home',
  'about': 'About',
  'gallery': 'Gallery',
  'login': 'Login',
  'preloader-demo': 'Preloader Demo',
  'pedagogic-league': 'Pedagogic League',
  'registration': 'Registration',
  'rules': 'Rules & Regulations',
  'committees': 'Committees',
  'interdepartment-football': 'Inter Department Football',
};

export default function GlobalBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Check if we are on the Home page
  const isHome = pathnames.length === 0;

  // Build segments starting from Home
  const segments = [
    { label: routeToTitleMap[''] || 'Home', href: '/', current: isHome },
  ];

  let accumulatedPath = '';
  pathnames.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    const isLast = index === pathnames.length - 1;

    let label = routeToTitleMap[segment.toLowerCase()];
    if (!label) {
      // Fallback formatting: capitalize words, replace dashes/underscores with spaces
      label = segment
        .split(/[-_]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    segments.push({
      label,
      href: isLast ? undefined : accumulatedPath,
      current: isLast,
    });
  });

  return (
    <div className="absolute top-28 left-0 w-full z-40 flex justify-center px-4 pointer-events-none">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-full flex justify-center"
      >
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-1.5 border border-zinc-800/60 bg-zinc-950/70 backdrop-blur-xl rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),_0_0_20px_rgba(59,130,246,0.1)] hover:border-zinc-700/50 transition-all duration-300 w-full max-w-full overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-center sm:w-fit sm:px-6">
            {segments.map((segment, index) => (
              <BreadcrumbItem key={segment.label + '-' + index} className="flex items-center gap-1.5 shrink-0">
                {!segment.current && segment.href ? (
                  <BreadcrumbLink asChild className="text-zinc-400 hover:text-white transition-colors duration-200 text-xs md:text-sm font-medium tracking-wide">
                    <Link to={segment.href}>
                      {segment.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-zinc-100 font-semibold text-xs md:text-sm tracking-wide">
                    {segment.label}
                  </BreadcrumbPage>
                )}
                {index < segments.length - 1 && (
                  <BreadcrumbSeparator className="text-zinc-600 [&>svg]:size-3 md:[&>svg]:size-3.5 flex items-center" />
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    </div>
  );
}
