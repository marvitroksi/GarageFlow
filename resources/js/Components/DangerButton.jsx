import { motion } from "framer-motion";


export default function DangerButton({
    children,
    onClick,
    type="button"
}) {


    return (

        <motion.button

            type={type}

            onClick={onClick}

            whileHover={{
                y:-2,
                scale:1.02
            }}

            whileTap={{
                scale:0.95
            }}

            className="
                inline-flex
                items-center
                gap-2
                bg-red-600
                text-white
                px-5
                py-2.5
                rounded-xl
                font-medium
                shadow-sm
                hover:bg-red-700
                transition
            "
        >

            {children}

        </motion.button>

    );

}