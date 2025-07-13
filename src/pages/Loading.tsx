import {motion} from "framer-motion";

const array = ['L', 'o', 'a', 'd', '.', '.', '.']

function Loading() {
    return (
        <div className={"w-screen h-screen max-w-full max-h-full flex items-center justify-center"}>
            <div className={"flex justify-center gap-4"}>
                {
                    array.map((s, i) => (
                        <motion.div
                            key={i}
                            className={"bg-slate-950 text-gray-50 dark:bg-gray-50 dark:text-slate-950 w-8 h-8 rounded-full flex justify-center items-center"}
                            animate={{
                                y: [0, -20, 0],
                                transition: {
                                    duration: array.length * 0.2,
                                    times: [0, 0.2, 1],
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: i * 0.2,
                                }
                            }}
                        >
                            {s}
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default Loading;