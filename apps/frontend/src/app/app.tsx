import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import Layout from './layout';
import Home from './home';

const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AnimateChildren = ({ children }: { children: ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const rootRoute = createRootRoute({
  component: () => <Layout />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AnimateChildren>
      <Home />
    </AnimateChildren>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
