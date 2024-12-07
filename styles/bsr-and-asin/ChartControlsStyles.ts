import { CSSProperties } from "react";

const styles = {
    chartcontrols: {
        padding: '5px 5px 0 16px',
        maxWidth: '100%',
        background: 'white',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",    /* Center vertically */
        height: "100%",
},
    am5stockControlButton: {
        display: 'inline-block',
        position: 'relative',
        border: '1px solid rgb(230, 230, 230)',
        borderRadius: '4px',
        padding: '3px 0px 3px 5px',
        margin: '2px',
        zIndex: 1,
        cursor: 'default',
        lineHeight: '1.5em',
        color: 'white'
    } as CSSProperties,
    am5stockControlLabel: {
        display: 'inline-block',
        margin: '0px 5px 0px 0px'
    },
    am5stockControlButtonDiv: {
        boxSizing: 'initial'
    },
    am5stockLink: {
        display: 'inline-block',
        margin: '0px 0.15em',
        padding: '0px 3px',
        borderRadius: '3px',
        cursor: 'pointer',
        color: 'black'
    }
};
export default styles;