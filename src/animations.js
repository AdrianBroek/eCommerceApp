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
        y: 100,
        transition: {
            duration : .35, 
            ease: 'easeOut'
        }
    }
}

export const glow = {
    none: {
        boxShadow: '0px 0px 0px #50c878',
    },
    show: {
        boxShadow: [
            '0px 0px 5px #50c878',
            '0px 0px 15px #50c878',
            '0px 0px 5px #50c878'
        ],
        transition: {
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
            repeatType: 'mirror' // Powoduje efekt płynnego pulsowania
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

export const arrowAnim = {
    hidden: {
        height: 10,
        opacity: 0
    },
    show: {
        height: 80,
        opacity: 1,
        transition: {
            duration: .5,
            ease: 'easeInOut'
        }
    }
}

export const showError = {
    hidden : {opacity: 0},
    show : {
        opacity: 1
    },
    exit : {color: "#4c2626"},
}