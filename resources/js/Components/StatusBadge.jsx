export default function StatusBadge({ status, size = "normal" }) {


    const styles = {

        pending: {
            label: "Pending",
            className: "bg-orange-100 text-gray-700 border-gray-300"
        },

        scheduled: {
            label: "Scheduled",
            className: "bg-blue-100 text-blue-700 border-blue-200"
        },

        in_progress: {
            label: "In Progress",
            className: "bg-yellow-100 text-yellow-700 border-yellow-200"
        },

        completed: {
            label: "Completed",
            className: "bg-green-100 text-green-700 border-green-200"
        },

        cancelled: {
            label: "Cancelled",
            className: "bg-red-100 text-red-700 border-red-200"
        }

    };


    const current = styles[status] || {
        label: status,
        className: "bg-gray-100 text-gray-700 border-gray-200"
    };


    return (

        <span

            className={`
                inline-flex
                items-center
                rounded-full
                font-semibold
                border

                ${
                    size === "large"
                    ?
                    "px-4 py-2 text-base"
                    :
                    "px-3 py-1 text-sm"
                }

                ${current.className}
            `}

        >

            {current.label}

        </span>

    );

}