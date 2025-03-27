import React, { useState } from 'react';
import { Snackbar, Typography } from '@mui/material';



type Props = {
    children: React.ReactNode;
};



export const Time = ({ children }: Props) => {

    const [open, setOpen] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText((children ?? '').toString())
        setOpen(true);
    }

    return (
        <>
            <Typography variant="h2" sx={{ mb: 2 }} onClick={() => copyToClipboard()}>
                {children}
            </Typography>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                slotProps={{
                    content: {
                        sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                        },
                    },
                }}
                message="Copied to clipboard"
            />
        </>
    );
};
