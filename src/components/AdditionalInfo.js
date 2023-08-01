import React, {useState} from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdditionalInfo = ({children, name}) => {

    const [open, setOpen] = useState(false)

    return (
        <motion.section
            id="additional-info"
            layout
            onClick={()=>setOpen(!open)}
            style={{ height: open ? "auto" : "auto" }}
            className="flex"
        >
            <motion.h2 layout>{name}</motion.h2>
            <motion.div layout className="icon flex"><FontAwesomeIcon icon={faPlus} /></motion.div>
            {open ? children : "" }
        </motion.section>
    )
}

export default AdditionalInfo