export const CartPopupAnim = {
    hidden : {
        opacity: 0,
        y: '-48%',
        x: '-50%',
    },
    show : {
        opacity: 1, 
        y: '-50%',
        x: '-50%',
        transition: {
            duration : .15, 
            ease: 'easeIn',
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration : .12, 
            ease: 'easeIn'
        }
    }
}


export const categorySquareHomePageAnim = {
    hidden : {
        height: '120px',
    },
    show : {
        height: '100%',
        transition: {
            duration : .12, 
            ease: 'easeOut',
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration : .12, 
            ease: 'easeIn'
        }
    }
}


export const popupAlertAnim = {
    hidden : {
        x: 300,
        opacity: 0,
        boxShadow: 0
    },
    show : {
        x: 0,
        opacity: 1,
        transition: {
            duration : .2, 
            ease: 'easeOut',
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration : .12, 
            ease: 'easeIn'
        }
    }
}

export const glow = {
    show: {
        boxShadow: '0px 0px 15px #50c878',
        transition: {
            yoyo : Infinity,
            duration : .85,
            ease: 'easeInOut'
        }   
    }
}

export const ProductImageSliderAnim = {
    hidden : {
        opacity: 0,
        y: '-10%',
    },
    show : {
        opacity: 1, 
        y: '0',
        x: '0',
        transition: {
            duration : .3, 
            ease: 'easeInOut',
        }
    },
    exit : {
        y: '-10%',
        opacity: 0,
        transition: {
            duration : .12, 
            ease: 'easeIn'
        }
    }
}

export const AdditionalInfoAnim = {
    closed : {
        height: '50px',
    },
    opened : {
        height: '100%', 
        transition: {
            duration : .35, 
            ease: 'easeInOut',
        }
    },
    exit : {
        y: '-10%',
        opacity: 0,
        transition: {
            duration : 10, 
            ease: 'easeIn'
        }
    }
}

export const AdditionalInfoAnimP = {
    closed : {
        height: '0',
        opacity: 0,
        padding: '0rem'
    },
    opened : {
        height: '100%', 
        opacity: 1,
        padding: '2rem',
        // transition: {
        //     duration : .15, 
        //     ease: 'easeInOut',
        // }
    },
}
