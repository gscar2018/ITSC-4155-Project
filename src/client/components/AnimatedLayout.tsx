import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const AnimatedLayout = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedLayout;