import { motion } from "framer-motion";


export default function AnimatedCard({
    children,
    className = "",
}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 15
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.35
            }}

            whileHover={{
                y: -4
            }}

            className={`
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                p-6

                ${className}
            `}

        >

            {children}

        </motion.div>

    );

}