import { CSSProperties } from "react";


const commonStyles = {
    mainDiv: {
        position: "relative",
        borderRadius: "5px",
        border: "1px solid rgb(238, 238, 238)",
        minHeight: "350px",
        backgroundColor: "white",
        direction: "ltr"
    } as CSSProperties,
    modalStyle: {
        position: 'relative !important',
        userSelect: 'auto !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        flex: '0 0 auto !important',
        // backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
        borderRadius: '6px !important',
        overflow: 'hidden !important',
        transform: 'translate(310px, 100px) !important',
        width: '1300px !important',
        height: '690px !important',
        maxWidth: '100% !important',
        maxHeight: '100% !important',
        minWidth: '1300px !important',
        minHeight: '690px !important',
        boxSizing: 'border-box !important',
    },

    modalHeader: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },

    modalContent: {
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '16px',
    },

    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '16px',
    },

    closeModalButton: {
        padding: '8px 16px',
        background: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },

    closeModalButtonText: {
        fontSize: '16px',
    },
    modalContentBox: {
        display: 'inline-block',
        width: 'calc(25% - 100px)', // Adjust the width as needed
        margin: '0 5px', // Adjust the margin as needed for spacing
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    } as CSSProperties,
    containerStyles :{
        // background: "rgb(248, 248, 248)",
        // height: "110px",
        borderBottom: "1px solid rgb(238, 238, 238)",
        borderRadius: "5px 5px 0px 0px",
        display: "flex",
        webkitBoxAlign: "stretch",
        padding: '5px 5px 0 16px',
        // justifyContent: 'end',
        // alignItems: 'center',
        // height: '100vh', // You can adjust the height to fit your layout
    } as CSSProperties,
    analyzeBtn:{
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontStretch: 'inherit',
        fontFamily: 'inherit',
        fontOpticalSizing: 'inherit',
        fontKerning: 'inherit',
        fontFeatureSettings: 'inherit',
        fontVariationSettings: 'inherit',
        flex: '0 0 auto',
        display: 'inline-flex',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
        WebkitBoxPack: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        fontWeight: '700',
        borderStyle: 'solid',
        lineHeight: '1em',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out 0s',
        minHeight: '32px',
        padding: '6px 8px',
        fontSize: '14px',
        background: 'transparent',
        color: 'rgb(155 61 134)',
        borderColor: 'rgb(155 61 134)',
        borderWidth: '1px',
        outline: 'none !important',
        height: '98px'
    } as CSSProperties,
    buttonContainer:{
        position: 'fixed',
        zIndex: '9999',
        marginLeft: '76%',
        background: 'rgb(248, 248, 248)'
    } as CSSProperties,
    buttonSvg:{
        height: '1em',
        overflow: 'visible',
        verticalAlign: '-0.125em'
    } as CSSProperties,
    customDataTableDiv:{
        // maxWidth: "600px",
        overflow:"auto",
        // maxHeight: "450px"
    } as CSSProperties,
};

export default commonStyles;