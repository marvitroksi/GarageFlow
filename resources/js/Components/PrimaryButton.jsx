import { motion } from "framer-motion";


export default function PrimaryButton({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = ""
}) {

    return (

        <motion.button

            type={type}

            onClick={onClick}

            disabled={disabled}

            whileHover={!disabled ? {
                y: -2,
                scale: 1.02
            } : {}}

            whileTap={!disabled ? {
                scale: 0.96
            } : {}}

            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                text-white
                px-5
                py-2.5
                rounded-xl
                font-medium
                shadow-sm
                hover:bg-blue-700
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
                ${className}
            `}
        >

            {children}

        </motion.button>

    );
}